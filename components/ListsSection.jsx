import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles"; // make sure this is imported\
import { SidebarItem } from "./SideBarItem";

const ListsSection = ({ customLists, currentList, onSelectList }) => {
  return (
    <View style={styles.listsSection}>
      {/* Header */}
      <View style={styles.listsSectionHeader}>
        <Text style={styles.listsSectionTitle}>Lists</Text>
        <TouchableOpacity onPress={() => console.log("Add new custom list")}>
          <Text style={styles.addListButton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Custom lists */}
      {customLists.map((list) => (
        <SidebarItem
          key={list.id}
          item={list}
          isCustomList={true}
            isSelected={currentList?.name === list.name}
          onPress={() => onSelectList?.(list)}
        />
      ))}
    </View>
  );
};

export default ListsSection;
