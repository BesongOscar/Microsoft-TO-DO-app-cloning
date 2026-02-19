import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const TaskItem = ({ task, onToggle, onSelect, onStarToggle }) => {
  return (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      {/* Completion checkbox */}
      <TouchableOpacity
        style={[
          styles.taskCheckbox,
          task.completed && styles.taskCheckboxCompleted,
        ]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        {task.completed && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>

      {/* Task text */}
      <Text
        style={task.completed ? styles.taskTextCompleted : styles.taskText}
        numberOfLines={2}
      >
        {task.text}
      </Text>

      {/* Star / importance toggle */}
      <TouchableOpacity
        onPress={onStarToggle}   // parent already wraps item.id
        style={styles.starButton}
        activeOpacity={0.7}
      >
        <Ionicons
          name={task.important ? "star" : "star-outline"}
          size={20}
          color={task.important ? "#FFD700" : "#ccc"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TaskItem;
