import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user && user.emailVerified) {
    return <Redirect href="/(protected)/myDay" />;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#f8f9fa" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgotPassword" />
        <Stack.Screen name="emailVerification" />
      </Stack>
    </>
  );
}
