import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";
import { SidebarItem } from "./SideBarItem";

const ListsSection = ({ customLists, currentList, onSelectList }) => {
  return (
    <View style={styles.listsSection}>
      {/* Section header */}
      <View style={styles.listsSectionHeader}>
        <Text style={styles.listsSectionTitle}>Lists</Text>
        <TouchableOpacity onPress={() => console.log("Add new custom list")}>
          <Text style={styles.addListButton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Custom list items */}
      {customLists.map((list) => (
        <SidebarItem
          key={list.id}
          item={list}
          isSelected={currentList?.name === list.name}
          onSelectList={onSelectList}   // ← was incorrectly passed as onPress
        />
      ))}
    </View>
  );
};

export default ListsSection;
