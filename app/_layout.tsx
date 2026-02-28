import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TasksProvider } from "../context/TasksContext";

export default function RootLayout(): JSX.Element {
  return (
    <TasksProvider>
      <StatusBar style="light" backgroundColor="#0078d4" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </TasksProvider>
  );
}
