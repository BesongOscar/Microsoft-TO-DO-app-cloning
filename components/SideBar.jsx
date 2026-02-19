import React from "react";
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "../styles/styles";
import ListsSection from "./ListsSection";
import { SidebarItem } from "./SideBarItem";

const Sidebar = ({ sidebarLists, customLists, currentList, onSelectList }) => {
  return (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Default Lists */}
        <FlatList
          data={sidebarLists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SidebarItem
              item={item}
              currentList={currentList}
              onSelectList={onSelectList}
            />
          )}
          scrollEnabled={false}
        />

        {/* Custom Lists Section */}
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
