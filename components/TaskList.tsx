import React from "react";
import { View, Text, FlatList } from "react-native";
import TaskItem from "./TaskItem";
import styles from "../styles/styles";
import { Task } from "../types";

// Extend Task with a section tag for the combined FlatList
type SectionedTask = Task & { section: "pending" | "completed" };

interface TasksListProps {
  pendingTasks: Task[];
  completedTasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (taskId: string) => void;
  onStarToggle: (taskId: string) => void;
  onEdit: (taskId: string, newText: string) => void;
  onDelete: (taskId: string) => void;
}

const TasksList: React.FC<TasksListProps> = ({
  pendingTasks,
  completedTasks,
  onToggleTask,
  onSelectTask,
  onStarToggle,
  onEdit,
  onDelete,
}) => {
  const combinedData: SectionedTask[] = [
    ...pendingTasks.map((task): SectionedTask => ({ ...task, section: "pending" })),
    ...completedTasks.map((task): SectionedTask => ({ ...task, section: "completed" })),
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList<SectionedTask>
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
            onEdit={onEdit}
            onDelete={onDelete}
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
