import React from 'react';
import { View, Text } from 'react-native';
import TaskItem from './TaskItem';
import styles from '../styles/styles';

const CompletedSection = ({ completedTasks, onToggleTask, onSelectTask }) => {
  if (completedTasks.length === 0) return null; // hide if none

  return (
    <View style={styles.completedSection}>
      <Text style={styles.completedHeader}>Completed</Text>
      {completedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onSelect={() => onSelectTask(task.id)}
        />
      ))}
    </View>
  );
};

export default CompletedSection;
