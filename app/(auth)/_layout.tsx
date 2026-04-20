import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <StatusBar backgroundColor="#0078d4" />
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
