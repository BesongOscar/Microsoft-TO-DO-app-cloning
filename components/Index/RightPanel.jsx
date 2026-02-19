import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import DetailOption from "../DetailOption";

const DETAIL_OPTIONS = [
  { icon: "📅", text: "Add due date" },
  { icon: "🔔", text: "Remind me" },
  { icon: "🔄", text: "Repeat" },
  { icon: "📝", text: "Add note" },
];

const RightPanel = ({ selectedTask, onClose }) => {
  // Guard: nothing selected
  if (!selectedTask) return null;

  return (
    <View style={styles.rightPanel}>
      {/* Header */}
      <View style={styles.taskDetailHeader}>
        <Text style={styles.taskDetailTitle} numberOfLines={2}>
          {selectedTask.text}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeDetailPanel}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Detail option rows */}
      <View style={styles.taskDetailContent}>
        {DETAIL_OPTIONS.map((option) => (
          <DetailOption key={option.text} icon={option.icon} text={option.text} />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.taskDetailFooter}>
        <Text style={styles.createdDate}>Created today</Text>
      </View>
    </View>
  );
};

export default RightPanel;
