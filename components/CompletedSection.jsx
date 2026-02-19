import React from "react";
import { View, Text } from "react-native";
import TaskItem from "./TaskItem";
import styles from "../styles/styles";

const CompletedSection = ({ completedTasks, onToggleTask, onSelectTask, onStarToggle }) => {
  if (completedTasks.length === 0) return null;

  return (
    <View style={styles.completedSection}>
      {/* Section header */}
      <View style={styles.completedHeader}>
        <Text style={styles.completedTitle}>
          Completed ({completedTasks.length})
        </Text>
      </View>

      {/* Completed task rows */}
      {completedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onSelect={() => onSelectTask(task.id)}
          onStarToggle={() => onStarToggle(task.id)}
        />
      ))}
    </View>
  );
};

export default CompletedSection;
