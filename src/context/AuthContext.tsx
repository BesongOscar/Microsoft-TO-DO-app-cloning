import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  reload,
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
  sendVerificationEmail: () => Promise<void>;
  reloadUser: () => Promise<void>;
  googleLogin: () => Promise<boolean>;
  userProfile: UserProfile | null;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  uploadProfilePhoto: (uri: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  /** Forces re-render after `reload()`; Firebase mutates the User in place. */
  const [, bumpUserRefresh] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      return;
    }
    setUserProfile((prev) => ({
      name: user.displayName ?? prev?.name ?? "",
      photoURL: user.photoURL ?? prev?.photoURL ?? null,
    }));
  }, [user]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    const u = auth.currentUser;
    if (!u) {
      throw new Error("No signed-in user");
    }
    await sendEmailVerification(u);
  };

  const reloadUser = async () => {
    const u = auth.currentUser;
    if (!u) return;
    await reload(u);
    bumpUserRefresh((t) => t + 1);
  };

  const googleLogin = async (): Promise<boolean> => {
    Alert.alert(
      "Google Sign-In",
      "Google Sign-In requires additional Firebase setup. Please use email/password for now, or configure Google OAuth in Firebase Console.",
    );
    return false;
  };

  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    if (!user) return;
    setUserProfile((prev) => {
      const base: UserProfile = {
        name: user.displayName ?? prev?.name ?? "",
        photoURL: user.photoURL ?? prev?.photoURL ?? null,
      };
      return { ...base, ...prev, ...profile };
    });
  };

  const uploadProfilePhoto = async (uri: string) => {
    if (!user) return;
    await updateUserProfile({ photoURL: uri });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        sendVerificationEmail,
        reloadUser,
        googleLogin,
        userProfile,
        updateUserProfile,
        uploadProfilePhoto,
      }}
    >
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
