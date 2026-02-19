import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/styles';

const AddTaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText); // Call the callback from parent
      setTaskText(''); // Clear input after adding
    }
  };

  return (
    <View style={styles.addTaskContainer}>
      <TextInput
        style={styles.addTaskInput}
        placeholder="Add a task"
        placeholderTextColor="#8a8886"
        value={taskText}
        onChangeText={setTaskText}
      />
      <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
        <Text style={styles.addTaskIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddTaskInput;