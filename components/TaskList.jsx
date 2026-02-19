import React from "react";
import { View, FlatList } from "react-native";
import TaskItem from "./TaskItem";
import CompletedSection from "./CompletedSection";
import styles from "../styles/styles";

const TasksList = ({
  pendingTasks,
  completedTasks,
  onToggleTask,
  onSelectTask,
  onStarToggle,
}) => {
   const combinedData = [
    ...pendingTasks.map(task => ({ ...task, section: "pending" })),
    ...completedTasks.map(task => ({ ...task, section: "completed" })),
  ];

  return (
    <View>
      {/* Pending Tasks */}
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tasksContainer}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => onToggleTask(item.id)}
            onSelect={() => onSelectTask(item.id)}
            onStarToggle={() => onStarToggle(item.id)}
          />
        )}
        ListFooterComponent={
          completedTasks.length > 0 && (
            <Text style={styles.completedHeader}>
              Completed ({completedTasks.length})
            </Text>
          )
        }
      />
    </View>
  );
}

export default TasksList;
