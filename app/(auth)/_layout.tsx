import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#f8f9fa" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="forgotPassword" />
        <Stack.Screen name="emailVerification" />
      </Stack>
    </>
  );
}
