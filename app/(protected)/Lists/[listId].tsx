/**
 * ListDetailScreen - Individual list task view
 * 
 * Dynamic route that renders tasks for a specific list.
 * Matches list by ID from sidebarLists or customLists.
 * Shows fallback if list is not found.
 */

import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sidebarLists } from "../../../constants/Lists";
import { useCustomLists } from "../../../context/CustomListsContext";
import { useTasks } from "../../../context/TasksContext";
import MainContent from "../../../components/Index/MainContent";
import { ListItem } from "../../../types";

export default function ListDetailScreen() {
  const { listId } = useLocalSearchParams<{ listId: string }>();
  const insets = useSafeAreaInsets();
  const {
    tasks,
    addTask,
    toggleTask,
    toggleImportant,
    deleteTask,
    updateTask,
    reorderTasks,
    refreshing,
    refreshTasks,
  } = useTasks();
  const { customLists } = useCustomLists();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const currentList = useMemo<ListItem | null>(() => {
    const sidebar = sidebarLists.find((l) => l.id === listId);
    if (sidebar) return sidebar;

    const custom = customLists.find((l) => l.id === listId);
    if (custom) {
      return {
        id: custom.id,
        name: custom.name,
        icon: custom.icon,
        color: custom.color,
        filterKey: "listId" as const,
      };
    }
    return null;
  }, [listId, customLists]);

  if (!currentList) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top,
        }}
      >
        <Text>List not found</Text>
      </View>
    );
  }

  const handleAddTask = (text: string) => {
    if (currentList.filterKey === "listId") {
      addTask(text, currentList.name, currentList.id);
    } else if (currentList.name === "My Day") {
      addTask(text, "My Day");
    } else {
      addTask(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MainContent
        currentList={currentList}
        tasks={tasks}
        onAddTask={handleAddTask}
        onToggleTask={toggleTask}
        onSelectTask={(id: string) => setSelectedTaskId(id)}
        onStarToggle={toggleImportant}
        onEdit={(id: string, text: string) => updateTask(id, { text })}
        onDelete={deleteTask}
        onReorderTasks={reorderTasks}
        refreshing={refreshing}
        onRefresh={refreshTasks}
      />
    </View>
  );
}
