/**
 * ListsLayout - Stack navigation for Lists tab
 * 
 * index: All lists overview
 * [listId]: Individual list detail (via dynamic route)
 */

import { Stack } from "expo-router";

export default function ListsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[listId]"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0078d4" },
          headerTintColor: "#fff",
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
