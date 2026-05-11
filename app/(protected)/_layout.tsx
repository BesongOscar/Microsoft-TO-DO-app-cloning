/**
 * ProtectedLayout - Tab navigation for authenticated users
 * 
 * Contains the main app tabs: My Day, Lists, Planned, Profile.
 * Handles shared state for selectedTask across all tabs
 * via the BottomSheet/BottomPanel pattern.
 */

import { useState } from "react";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/AuthContext";
import { AuthLoadingScreen } from "@/components/AuthLoadingScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTasks } from "../../context/TasksContext";
import BottomSheet from "../../components/Index/BottomSheet";
import BottomPanel from "@/components/Index/BottomPanel";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const { tasks, updateTask, toggleImportant } = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const selectedTask = tasks.find((t) => t.id === selectedTaskId) ?? null;

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
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0078d4",
          tabBarInactiveTintColor: "#605e5c",
          tabBarStyle: {
            backgroundColor: "#f3f2f1",
            borderTopWidth: 1,
            borderTopColor: "#e1e5e9",
          },
        }}
      >
        <Tabs.Screen
          name="myDay"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#0078d4",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: "Hi " + ((user.displayName?.split(" ")[0]) || "there") + " 👋",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: "Poppins-SemiBold",
              color: "#fff",
            },
            tabBarLabel: "My Day",
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "Poppins-SemiBold",
              marginTop: 2,
            },
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "sunny" : "sunny-outline"}
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Lists"
          options={{
            headerShown: false,
            tabBarLabel: "Lists",
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "Poppins-SemiBold",
              marginTop: 2,
            },
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Planned"
          options={{
            headerShown: false,
            tabBarLabel: "Planned",
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "Poppins-SemiBold",
              marginTop: 2,
            },
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "Poppins-SemiBold",
              marginTop: 2,
            },
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={30}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      <BottomSheet
        visible={selectedTask != null}
        onClose={() => setSelectedTaskId(null)}
      >
        {selectedTask && (
          <BottomPanel
            selectedTask={selectedTask}
            onClose={() => setSelectedTaskId(null)}
            onUpdateTask={updateTask}
            onStarToggle={() => toggleImportant(selectedTask.id)}
          />
        )}
      </BottomSheet>
    </>
  );
}
