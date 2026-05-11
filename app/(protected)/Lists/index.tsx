/**
 * ListsIndexScreen - All lists overview
 * 
 * Shows default lists (My Day, Important, etc.) and custom lists
 * in a FlatList. Navigates to list detail on tap.
 * Replaces the sidebar from the old main monolithic layout.
 */

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sidebarLists } from "../../../constants/Lists";
import { useCustomLists } from "../../../context/CustomListsContext";
import { useTasks } from "../../../context/TasksContext";
import { CustomList, TaskCounts } from "../../../types";
import CustomListModal from "../../../components/CustomListModal";

interface ListEntry {
  key: string;
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  isCustom: boolean;
}

export default function ListsIndexScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { counts } = useTasks();
  const { customLists, addList } = useCustomLists();
  const [modalVisible, setModalVisible] = useState(false);

  const defaultLists: ListEntry[] = sidebarLists.map((list) => ({
    key: `default-${list.id}`,
    id: list.id,
    name: list.name,
    icon: list.icon,
    color: list.color,
    count: counts[list.filterKey as keyof TaskCounts] ?? 0,
    isCustom: false,
  }));

  const customListEntries: ListEntry[] = customLists.map((list) => ({
    key: `custom-${list.id}`,
    id: list.id,
    name: list.name,
    icon: list.icon,
    color: list.color,
    count: list.taskCount,
    isCustom: true,
  }));

  const allLists = [...defaultLists, ...customListEntries];

  const handleSelectList = (entry: ListEntry) => {
    router.push(`/(protected)/Lists/${entry.id}`);
  };

  const handleAddCustomList = (name: string, icon: string) => {
    addList(name, icon);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: ListEntry }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleSelectList(item)}
      activeOpacity={0.6}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}
      >
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listName}>{item.name}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{item.count}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#8A8A8A" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lists</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={28} color="#0078d4" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={allLists}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.list}
      />
      <CustomListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddCustomList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0078d4",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
  list: {
    paddingVertical: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e1e5e9",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#201f1e",
  },
  countContainer: {
    marginRight: 8,
    minWidth: 24,
    alignItems: "center",
  },
  count: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#8A8A8A",
  },
});
