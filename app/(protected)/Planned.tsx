/**
 * PlannedScreen - Tasks grouped by due date
 * 
 * Shows all tasks with due dates, grouped into date sections
 * (Overdue, Today, Tomorrow, This Week, etc.).
 */

import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTasks } from "../../context/TasksContext";
import MainContent from "../../components/Index/MainContent";
import { ListItem } from "../../types";

const plannedList: ListItem = {
  id: "3",
  name: "Planned",
  icon: "📅",
  color: "#107c10",
  filterKey: "planned",
};

export default function PlannedScreen() {
  const insets = useSafeAreaInsets();
  const { tasks, addTask, toggleTask, toggleImportant, deleteTask, updateTask, reorderTasks, refreshing, refreshTasks} = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <MainContent
        currentList={plannedList}
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
