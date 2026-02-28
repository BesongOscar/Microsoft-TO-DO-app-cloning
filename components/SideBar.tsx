import React from "react";
import { View, FlatList, ScrollView } from "react-native";
import styles from "../styles/styles";
import ListsSection from "./ListsSection";
import { SidebarItem } from "./SideBarItem";
import { ListItem } from "../types";

interface SidebarProps {
  sidebarLists: ListItem[];
  customLists: ListItem[];
  currentList: ListItem | null;
  onSelectList: (item: ListItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarLists,
  customLists,
  currentList,
  onSelectList,
}) => {
  return (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Default / built-in lists */}
        <FlatList
          data={sidebarLists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SidebarItem
              item={item}
              isSelected={currentList?.name === item.name}
              onSelectList={onSelectList}
            />
          )}
          scrollEnabled={false}
        />

        {/* User-created custom lists */}
        <ListsSection
          customLists={customLists}
          currentList={currentList}
          onSelectList={onSelectList}
        />
      </ScrollView>
    </View>
  );
};

export default Sidebar;
