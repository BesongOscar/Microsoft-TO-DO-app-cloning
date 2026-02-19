import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  // Header styles
  topHeader: {
    backgroundColor: "#0078d4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 5,
    height: 56,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  menuIcon: {
    color: "white",
    fontSize: 18,
  },
  appTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },

  // Sidebar styles
  animatedSidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    zIndex: 10,
  },

  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent black
    zIndex: 5,
  },
  sidebar: {
    flex: 1,
    width: 280,
    backgroundColor: "#f3f2f1",
    borderRightWidth: 1,
    borderRightColor: "#e1e5e9",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  sidebarItemSelected: {
    backgroundColor: "#e1f3ff", // highlight selected list
  },
  sidebarItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  sidebarIcon: {
    width: 20,
    height: 20,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sidebarIconText: {
    fontSize: 10,
    color: "white",
  },
  sidebarItemText: {
    fontSize: 14,
    color: "#323130",
    flex: 1,
  },
  sidebarCount: {
    fontSize: 12,
    color: "#605e5c",
    backgroundColor: "#e1e5e9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 20,
    textAlign: "center",
  },

  // Main container
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "white",
  },

  // List header
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f2f1",
  },
  listTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#323130",
    marginBottom: 4,
  },
  listDate: {
    fontSize: 14,
    color: "#605e5c",
  },

  // Suggestions banner
  suggestionsBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff4ce",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f2f1",
  },
  suggestionsLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  suggestionsIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  suggestionsText: {
    fontSize: 14,
    color: "#323130",
    flex: 1,
  },
  suggestionsCloseButton: {
    padding: 8,
  },
  suggestionsCloseText: {
    fontSize: 20,
    color: "#605e5c",
  },

  // Add task input
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f2f1",
  },
  addTaskButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0078d4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 1,
  },
  addTaskIcon: {
    fontSize: 12,
    color: "#0078d4",
    fontWeight: "bold",
  },
  addTaskInput: {
    flex: 1,
    fontSize: 16,
    color: "#323130",
    paddingVertical: 0,
  },

  // Tasks list
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },

  // Checkbox container
  taskCheckbox: {
    marginRight: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0078d4",
    justifyContent: "center",
    alignItems: "center",
  },

  // Filled checkbox when task is completed
  taskCheckboxCompleted: {
    backgroundColor: "#0078d4",
  },

  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Task text
  taskText: {
    fontSize: 16,
    color: "#323130",
    flex: 1,
  },
  taskTextCompleted: {
    fontSize: 16,
    color: "#8a8886",
    textDecorationLine: "line-through",
    flex: 1,
  },

  // Optional touch feedback (can use activeOpacity in component)
  activeOpacity: {
    opacity: 0.7,
  },

  // Completed section
  completedSection: {
    marginTop: 24,
  },
  completedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
  },
  completedTitle: {
    fontSize: 14,
    color: "#605e5c",
    fontWeight: "600",
  },

  // Right panel
  rightPanel: {
    width: 320,
    backgroundColor: "#faf9f8",
    borderLeftWidth: 1,
    borderLeftColor: "#e1e5e9",
    flex: 1,
  },
  taskDetailContent: {
    padding: 20,
    flexGrow: 1,
  },
  taskDetailTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#323130",
    flex: 1,
  },
  closeDetailPanel: {
    fontSize: 20,
    color: "#605e5c",
    padding: 4,
  },

  // Touch feedback (active opacity can also be applied in components)
  activeOpacity: {
    opacity: 0.7,
  },
});

export default styles;
