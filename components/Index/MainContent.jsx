import React, { useState } from "react";
import { View } from "react-native";

import styles from "../../styles/styles";
import ListHeader from "../ListHeader";
import SuggestionsBanner from "../SuggestionBanner";
import AddTaskInput from "../AddTaskInput";
import TasksList from "../TaskList";

const MainContent = ({ currentList, tasks, onAddTask, onToggleTask, onSelectTask }) => {
  const [showBanner, setShowBanner] = useState(true); // state for banner visibility

  // Filter tasks based on current list
  const filteredTasks = tasks.filter(task => {
    if (currentList.name === 'My Day') return task.myDay;
    if (currentList.name === 'Important') return task.important;
    return true; // default: show all tasks
  });

  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning!" : hour < 18 ? "Good afternoon!" : "Good evening!";

  // Dynamic date
  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <View style={styles.mainContent}>
      {/* List title and date */}
      <ListHeader title={currentList.name} date={todayDate} />

      {/* Suggestions banner */}
      {showBanner && (
        <SuggestionsBanner
          message={`${greeting} Here are your tasks for today.`}
          onClose={() => setShowBanner(false)} // close banner
        />
      )}

      {/* Input to add new tasks */}
      <AddTaskInput onAddTask={onAddTask} />

      {/* List of tasks */}
      <TasksList 
        pendingTasks={pendingTasks} 
        completedTasks={completedTasks} 
        onToggleTask={onToggleTask}
        onSelectTask={onSelectTask}
      />
    </View>
  );
};

export default MainContent;
