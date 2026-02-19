import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import taskItemStyles from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const TaskItem = ({ task, onToggle, onSelect, onStarToggle }) => {

  const handleStarToggle = () => {
    onStarToggle(task.id, !task.Important); // notify parent of the change
  };
  return (
    <TouchableOpacity
      style={taskItemStyles.taskItem}
      onPress={onSelect}
      activeOpacity={0.7} // smooth touch feedback
    >
      <TouchableOpacity
        style={[
          taskItemStyles.taskCheckbox,
          task.completed && taskItemStyles.taskCheckboxCompleted,
        ]}
        onPress={onToggle}
      >
        {task.completed && <Text style={taskItemStyles.checkmark}>✔</Text>}
      </TouchableOpacity>

      <Text
        style={
          task.completed
            ? taskItemStyles.taskTextCompleted
            : taskItemStyles.taskText
        }
      >
        {task.text}
      </Text>

      <TouchableOpacity onPress={handleStarToggle} style={taskItemStyles.starButton}>
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