import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/AuthContext";
import { AuthLoadingScreen } from "@/components/AuthLoadingScreen";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (!user.emailVerified) {
    return <Redirect href="/emailVerification" />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#0078d4" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}
