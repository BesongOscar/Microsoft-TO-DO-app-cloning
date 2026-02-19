import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import DetailOption from "../DetailOption";

const RightPanel = ({ selectedTask }) => {
  const detailOptions = [
    { icon: '📅', text: 'Add due date' },
    { icon: '🔔', text: 'Remind me' },
    { icon: '🔄', text: 'Repeat' },
    { icon: '📝', text: 'Add note' },
  ];

  return (
    <View style={styles.rightPanel}>
      <View style={styles.taskDetailHeader}>
        <Text style={styles.taskDetailTitle}>{selectedTask.text}</Text>
        <TouchableOpacity>
          <Text style={styles.closeDetailPanel}>×</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.taskDetailContent}>
        {detailOptions.map((option, index) => (
          <DetailOption key={index} icon={option.icon} text={option.text} />
        ))}
      </View>
      
      <View style={styles.taskDetailFooter}>
        <Text style={styles.createdDate}>Created today</Text>
      </View>
    </View>
  );
};
export default RightPanel;
