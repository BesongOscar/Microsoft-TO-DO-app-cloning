import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TasksProvider } from "../context/TasksContext";
import ErrorBoundary from "../components/ErrorBoundary";
import { AuthProvider } from "../src/context/AuthContext";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

export default function RootLayout() {

  return (
    <ErrorBoundary>
      <AuthProvider>
        <TasksProvider>
          <StatusBar backgroundColor="#0078d4" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)"/>
            <Stack.Screen name="main" />
            <Stack.Screen name="settings"/>
          </Stack>
        </TasksProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
