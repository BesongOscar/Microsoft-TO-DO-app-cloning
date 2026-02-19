import React, { useState } from "react";
import { View } from "react-native";
import styles from "../../styles/styles";
import ListHeader from "../ListHeader";
import SuggestionsBanner from "../SuggestionBanner";
import AddTaskInput from "../AddTaskInput";
import TasksList from "../TaskList";

// ─── Task filter logic ────────────────────────────────────────────────────────
// Driven by list.filterKey so renaming a list never silently breaks filtering.
const filterTasks = (tasks, list) => {
  switch (list.filterKey) {
    case "myDay":
      return tasks.filter((t) => t.myDay);
    case "important":
      return tasks.filter((t) => t.important);
    case "completed":
      return tasks.filter((t) => t.completed);
    case "all":
      return tasks;
    case "planned":
      // Ready for when dueDate is added to tasks
      return tasks.filter((t) => Boolean(t.dueDate));
    case "tasks":
      // Default inbox: tasks not pinned to My Day or Important
      return tasks.filter((t) => !t.myDay && !t.important);
    case "listId":
      // Custom lists — match by the list's id stored on the task
      return tasks.filter((t) => t.listId === list.id);
    default:
      return tasks;
  }
};

// ─────────────────────────────────────────────────────────────────────────────

const MainContent = ({
  currentList,
  tasks,
  onAddTask,
  onToggleTask,
  onSelectTask,
  onStarToggle,
}) => {
  const [showBanner, setShowBanner] = useState(true);

  const filteredTasks  = filterTasks(tasks, currentList);
  const pendingTasks   = filteredTasks.filter((t) => !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  // Dynamic greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning!" : hour < 18 ? "Good afternoon!" : "Good evening!";

  // Dynamic date
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.mainContent}>
      <ListHeader title={currentList.name} date={todayDate} />

      {showBanner && (
        <SuggestionsBanner
          message={`${greeting} Here are your tasks for today.`}
          onClose={() => setShowBanner(false)}
        />
      )}

      <AddTaskInput onAddTask={onAddTask} />

      <TasksList
        pendingTasks={pendingTasks}
        completedTasks={completedTasks}
        onToggleTask={onToggleTask}
        onSelectTask={onSelectTask}
        onStarToggle={onStarToggle}
      />
    </View>
  );
};

export default MainContent;
