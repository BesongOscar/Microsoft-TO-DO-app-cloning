/**
 * TasksList - Scrollable list of TaskItems with long-press drag reordering
 *
 * Replaces react-native-draggable-flatlist with a manual implementation
 * using only React Native core + react-native-gesture-handler to avoid
 * the react-native-reanimated New Architecture TurboModule crash.
 *
 * Drag UX:
 * - User long-presses the ☰ grip icon to initiate a drag
 * - The dragged item is visually highlighted (opacity + background)
 * - On release, the item is inserted at the nearest valid position
 * - onReorderTasks is called with the updated order
 */

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import TaskItem from "./TaskItem";
import { taskListStyles as styles } from "../styles/components/TaskList";
import { Task } from "../types";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ITEM_HEIGHT = 56; // approximate height per task row in px

interface TasksListProps {
  pendingTasks: Task[];
  completedTasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (taskId: string) => void;
  onEdit: (taskId: string, newText: string) => void;
  onDelete: (taskId: string) => void;
  onReorderTasks: (reorderedTasks: Task[]) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const TasksList: React.FC<TasksListProps> = ({
  pendingTasks,
  completedTasks,
  onToggleTask,
  onSelectTask,
  onEdit,
  onDelete,
  onReorderTasks,
  refreshing = false,
  onRefresh,
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const dragStartY = useRef(0);
  const currentOrder = useRef<Task[]>(pendingTasks);

  // Keep ref in sync with prop
  currentOrder.current = pendingTasks;

  /**
   * Creates a PanResponder for the grip icon of task at `index`.
   * Tracks vertical drag offset and maps it to a target insertion index.
   */
  const createPanResponder = (index: number) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        dragStartY.current = evt.nativeEvent.pageY;
        setDraggingIndex(index);
        setHoverIndex(index);
      },

      onPanResponderMove: (evt) => {
        const dy = evt.nativeEvent.pageY - dragStartY.current;
        const rawTarget = index + Math.round(dy / ITEM_HEIGHT);
        const clampedTarget = Math.max(
          0,
          Math.min(currentOrder.current.length - 1, rawTarget)
        );
        setHoverIndex(clampedTarget);
      },

      onPanResponderRelease: () => {
        if (
          draggingIndex !== null &&
          hoverIndex !== null &&
          draggingIndex !== hoverIndex
        ) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const reordered = [...currentOrder.current];
          const [moved] = reordered.splice(draggingIndex, 1);
          reordered.splice(hoverIndex, 0, moved);
          onReorderTasks(reordered);
        }
        setDraggingIndex(null);
        setHoverIndex(null);
      },

      onPanResponderTerminate: () => {
        setDraggingIndex(null);
        setHoverIndex(null);
      },
    });

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.tasksContainer}
      // Disable scroll while dragging so pan gesture takes over
      scrollEnabled={draggingIndex === null}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0078d4"
          />
        ) : undefined
      }
    >
      {/* Pending tasks — draggable */}
      {pendingTasks.map((task, index) => {
        const panResponder = createPanResponder(index);
        const isActive = draggingIndex === index;
        const isHoverTarget = hoverIndex === index && draggingIndex !== index;

        return (
          <View
            key={task.id}
            style={isHoverTarget ? { borderTopWidth: 2, borderTopColor: "#0078d4" } : undefined}
            {...panResponder.panHandlers}
          >
            <TaskItem
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onSelect={() => onSelectTask(task.id)}
              onEdit={onEdit}
              onDelete={onDelete}
              isActive={isActive}
              // Pass a no-op — grip's panResponder is on the wrapper View
              onDragStart={() => {}}
            />
          </View>
        );
      })}

      {/* Completed tasks — static */}
      {completedTasks.length > 0 && (
        <View style={styles.completedHeader}>
          <Text style={styles.completedTitle}>
            Completed ({completedTasks.length})
          </Text>
        </View>
      )}

      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => onToggleTask(item.id)}
            onSelect={() => onSelectTask(item.id)}
            onEdit={onEdit}
            onDelete={onDelete}
            isActive={false}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default TasksList;
