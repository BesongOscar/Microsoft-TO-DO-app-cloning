/**
 * googleAuth.ts - Google Sign-In helper using @react-native-google-signin/google-signin
 *
 * Wraps the native Google Sign-In SDK. Must be configured once at app startup
 * before any sign-in attempts. The webClientId is required by Firebase to
 * validate the ID token on the backend.
 *
 * Usage:
 *   import { configureGoogleSignIn, signInWithGoogle, signOutGoogle } from './googleAuth';
 *   configureGoogleSignIn(); // call once in _layout.tsx
 *   const { idToken } = await signInWithGoogle();
 */

import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";

/**
 * Configure Google Sign-In — call this once at app startup (in _layout.tsx).
 * webClientId must be the WEB client ID (not Android/iOS), because Firebase
 * uses it to verify the token server-side.
 */
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    scopes: ["profile", "email"],
    offlineAccess: false,
  });
};

export interface GoogleSignInResult {
  idToken: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
  };
}

/**
 * Trigger the native Google Sign-In flow.
 * Returns the idToken (for Firebase) and basic user info.
 * Throws a user-readable error string on failure.
 */
export const signInWithGoogle = async (): Promise<GoogleSignInResult> => {
  // Check Google Play Services availability (Android only; no-op on iOS)
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const response = await GoogleSignin.signIn();

  // The SDK returns a typed response — data is present on success
  if (!response.data) {
    throw new Error("Google Sign-In returned no data");
  }

  const { idToken, user } = response.data;

  if (!idToken) {
    throw new Error("No ID token returned from Google Sign-In");
  }

  return {
    idToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    },
  };
};

/**
 * Sign the user out of Google.
 * Call this alongside your Firebase signOut() in AuthContext.logout().
 */
export const signOutGoogle = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    // Non-critical — log but don't block the Firebase signout
    console.warn("Google signOut error:", error);
  }
};

/**
 * Maps Google Sign-In SDK error codes to user-readable messages.
 * Use this in catch blocks to show meaningful alerts.
 */
export const getGoogleSignInErrorMessage = (error: unknown): string => {
  if (isErrorWithCode(error)) {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        return "Sign-in was cancelled";
      case statusCodes.IN_PROGRESS:
        return "Sign-in is already in progress";
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return "Google Play Services not available or outdated";
      default:
        return error.message ?? "Google Sign-In failed";
    }
  }
  return error instanceof Error ? error.message : "An unexpected error occurred";
};