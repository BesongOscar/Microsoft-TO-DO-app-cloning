/**
 * MyDayScreen - "My Day" focused task view
 * 
 * Dedicated screen for the My Day task list, extracted from
 * the old monolithic main.tsx. Shows only tasks flagged as My Day.
 */

import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTasks } from "../../context/TasksContext";
import MainContent from "../../components/Index/MainContent";
import { ListItem, Task } from "../../types";

const myDayList: ListItem = {
  id: "1",
  name: "My Day",
  icon: "☀️",
  color: "#0078d4",
  filterKey: "myDay",
};

export default function MyDayScreen() {
  const insets = useSafeAreaInsets();
  const { tasks, addTask, toggleTask, toggleImportant, deleteTask, updateTask, reorderTasks, refreshing, refreshTasks} = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, }}>
      <MainContent
        currentList={myDayList}
        tasks={tasks}
        onAddTask={addTask}
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
