import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";

export const SidebarItem = ({ item, onSelectList, isSelected }) => {
  if (!item) return null;

  return (
    <TouchableOpacity
      style={[styles.sidebarItem, isSelected && styles.sidebarItemSelected]}
      onPress={() => onSelectList(item)}
      activeOpacity={0.7}
    >
      <View style={styles.sidebarItemLeft}>
        <Text style={styles.sidebarIconText}>{item.icon}</Text>
        <Text style={styles.sidebarItemText}>{item.name}</Text>
      </View>

      {item.count !== undefined && (
        <Text style={styles.sidebarCount}>{item.count}</Text>
      )}
    </TouchableOpacity>
  );
};
