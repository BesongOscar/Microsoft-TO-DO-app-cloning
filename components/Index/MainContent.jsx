import React, { useState } from "react";
import { View } from "react-native";
import styles from "../../styles/styles";
import ListHeader from "../ListHeader";
import SuggestionsBanner from "../SuggestionBanner";
import AddTaskInput from "../AddTaskInput";
import TasksList from "../TaskList";

const filterTasks = (tasks, list) => {
  switch (list.filterKey) {
    case "myDay":      return tasks.filter((t) => t.myDay);
    case "important":  return tasks.filter((t) => t.important);
    case "completed":  return tasks.filter((t) => t.completed);
    case "all":        return tasks;
    case "planned":    return tasks.filter((t) => Boolean(t.dueDate));
    case "tasks":      return tasks.filter((t) => !t.myDay && !t.important);
    case "listId":     return tasks.filter((t) => t.listId === list.id);
    default:           return tasks;
  }
};

const MainContent = ({
  currentList,
  tasks,
  onAddTask,
  onToggleTask,
  onSelectTask,
  onStarToggle,
  onEdit,
  onDelete,
}) => {
  const [showBanner, setShowBanner] = useState(true);

  const filteredTasks  = filterTasks(tasks, currentList);
  const pendingTasks   = filteredTasks.filter((t) => !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? "Good morning!" : hour < 18 ? "Good afternoon!" : "Good evening!";
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
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
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </View>
  );
};

export default MainContent;
