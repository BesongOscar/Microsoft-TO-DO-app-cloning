import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../firebase/config";

interface UserProfile {
  name: string;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  userProfile: UserProfile | null;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  uploadProfilePhoto: (uri: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const googleLogin = async () => {
    Alert.alert("Google Sign-In", "Google Sign-In requires additional Firebase setup. Please use email/password for now, or configure Google OAuth in Firebase Console.");
  };

  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    if (!user) return;
    // Placeholder - would update Firebase user profile
    setUserProfile(prev => prev ? { ...prev, ...profile } : profile as UserProfile);
  };

  const uploadProfilePhoto = async (uri: string) => {
    if (!user) return;
    // Placeholder - would upload to Firebase Storage and update profile
    await updateUserProfile({ photoURL: uri });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPassword, googleLogin, userProfile, updateUserProfile, uploadProfilePhoto }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};