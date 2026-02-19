import React from "react";
import { View, Text, FlatList } from "react-native";
import TaskItem from "./TaskItem";
import styles from "../styles/styles";

const TasksList = ({
  pendingTasks,
  completedTasks,
  onToggleTask,
  onSelectTask,
  onStarToggle,
}) => {
  const combinedData = [
    ...pendingTasks.map((task) => ({ ...task, section: "pending" })),
    ...completedTasks.map((task) => ({ ...task, section: "completed" })),
  ];

  return (
    <View style={{ flex: 1 }}>
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
          completedTasks.length > 0 ? (
            <View style={styles.completedHeader}>
              <Text style={styles.completedTitle}>
                Completed ({completedTasks.length})
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default TasksList;
