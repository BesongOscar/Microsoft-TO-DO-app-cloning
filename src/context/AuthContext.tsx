import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithCredential,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../firebase/config";

const AUTH_TOKEN_KEY = "firebase_auth_token";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const restoreToken = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
          console.log("Token found in storage, user should be restored by Firebase");
        }
      } catch (error) {
        console.error("Error reading token:", error);
      }
      setInitialized(true);
      setLoading(false);
    };

    restoreToken();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          await AsyncStorage.setItem(AUTH_TOKEN_KEY, tokenResult.token);
        } catch (error) {
          console.error("Error saving token:", error);
        }
      } else {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, [initialized]);

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

  const googleLogin = async () => {
    Alert.alert("Google Sign-In", "Google Sign-In requires additional Firebase setup. Please use email/password for now, or configure Google OAuth in Firebase Console.");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, googleLogin }}>
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