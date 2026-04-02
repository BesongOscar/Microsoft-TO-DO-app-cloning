import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as WebBrowser from "expo-web-browser";
import { auth, db, storage } from "../firebase/config";

const AUTH_TOKEN_KEY = "firebase_auth_token";

interface UserProfile {
  name: string;
  email: string;
  photoURL: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  updateUserProfile: (name: string, photoURL?: string) => Promise<void>;
  uploadProfilePhoto: (uri: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  const fetchUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          await AsyncStorage.setItem(AUTH_TOKEN_KEY, tokenResult.token);
          await fetchUserProfile(user.uid);
        } catch (error) {
          console.error("Error saving token:", error);
        }
      } else {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (user) {
      await updateProfile(user, { displayName: name });
      
      const profileData: UserProfile = {
        name,
        email,
        photoURL: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, "users", user.uid), profileData);
      setUserProfile(profileData);
    }
  };

  const updateUserProfile = async (name: string, photoURL?: string) => {
    if (!user) return;
    
    try {
      await updateProfile(user, { displayName: name, photoURL: photoURL || undefined });
      
      const profileData = {
        name,
        email: user.email || "",
        photoURL: photoURL || userProfile?.photoURL || null,
        createdAt: userProfile?.createdAt || new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
      setUserProfile(profileData as UserProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const uploadProfilePhoto = async (uri: string): Promise<string> => {
    if (!user) throw new Error("No user logged in");
    
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_photos/${user.uid}`);
      
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const googleLogin = async () => {
    Alert.alert("Google Sign-In", "Google Sign-In requires additional Firebase setup. Please use email/password for now, or configure Google OAuth in Firebase Console.");
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, login, signup, logout, googleLogin, updateUserProfile, uploadProfilePhoto }}>
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