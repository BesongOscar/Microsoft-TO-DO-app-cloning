import React, { useState } from "react";
import { View } from "react-native";
import styles from "../../styles/styles";
import ListHeader from "../ListHeader";
import SuggestionsBanner from "../SuggestionBanner";
import AddTaskInput from "../AddTaskInput";
import TasksList from "../TaskList";

const MainContent = ({
  currentList,
  tasks,
  onAddTask,
  onToggleTask,
  onSelectTask,
  onStarToggle,
}) => {
  const [showBanner, setShowBanner] = useState(true);

  // Filter tasks based on the currently selected list
  const filteredTasks = tasks.filter((task) => {
    switch (currentList.name) {
      case "My Day":
        return task.myDay;
      case "Important":
        return task.important;
      case "Completed":
        return task.completed;
      case "All":
        return true;
      case "Planned":
        return Boolean(task.dueDate); // ready for when dueDate is added
      default:
        // Custom lists matched by id
        return task.listId === currentList.id;
    }
  });

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

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
        onStarToggle={onStarToggle}   // ← was missing
      />
    </View>
  );
};

export default MainContent;
