import { Stack } from "expo-router";
import { TasksProvider } from "../context/TasksContext";
import { CustomListsProvider } from "../context/CustomListsContext";
import ErrorBoundary from "../components/ErrorBoundary";
import { AuthProvider } from "../src/context/AuthContext";
import { useEffect } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
  });

  useEffect(() => {
    if (fontError && __DEV__) {
      console.error("[fonts]", fontError);
    }
  }, [fontError]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CustomListsProvider>
          <TasksProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(protected)" />
            </Stack>
          </TasksProvider>
        </CustomListsProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
