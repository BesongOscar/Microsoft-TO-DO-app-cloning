import {
  View,
  StatusBar,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import styles from "../styles/styles";
import Header from "../components/Index/header";
import Sidebar from "../components/SideBar";
import MainContent from "../components/Index/MainContent";
import RightPanel from "../components/Index/RightPanel";
import { sidebarLists, customLists } from "../constants/Lists";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      text: "Review quarterly reports",
      completed: false,
      important: true,
      myDay: true,
    },
    {
      id: "2",
      text: "Call client about project update",
      completed: false,
      important: false,
      myDay: true,
    },
    {
      id: "3",
      text: "Prepare presentation slides",
      completed: false,
      important: true,
      myDay: true,
    },
    {
      id: "4",
      text: "Team meeting at 3 PM",
      completed: false,
      important: false,
      myDay: false,
    },
    {
      id: "5",
      text: "Update project documentation",
      completed: true,
      important: false,
      myDay: false,
    },
    {
      id: "6",
      text: "Send weekly status report",
      completed: true,
      important: false,
      myDay: false,
    },
  ]);

  const [currentList, setCurrentList] = useState({ name: "My Day" });
  const [selectedTaskId, setSelectedTaskId] = useState("1");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Derived selected task
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  // ─── Sidebar animation ────────────────────────────────────────────────────
  const sidebarAnim = useRef(new Animated.Value(-250)).current;

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: -250,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  // ─── Task handlers ────────────────────────────────────────────────────────

  // Use timestamp for unique IDs — avoids collisions after deletions
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      important: false,
      myDay: currentList.name === "My Day",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Toggle the important/star flag on a task
  const handleStarToggle = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task,
      ),
    );
  };

  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId);
  };

  // ─── Dynamic counts ───────────────────────────────────────────────────────
  // Compute live badge counts from tasks state instead of using hardcoded values.
  const getCount = (list) => {
    switch (list.filterKey) {
      case "myDay":
        return tasks.filter((t) => t.myDay && !t.completed).length;
      case "important":
        return tasks.filter((t) => t.important && !t.completed).length;
      case "completed":
        return tasks.filter((t) => t.completed).length;
      case "all":
        return tasks.length;
      case "planned":
        return tasks.filter((t) => Boolean(t.dueDate)).length;
      case "tasks":
        return tasks.filter((t) => !t.myDay && !t.important && !t.completed)
          .length;
      case "listId":
        return tasks.filter((t) => t.listId === list.id && !t.completed).length;
      default:
        return 0;
    }
  };

  const liveSidebarLists = sidebarLists.map((l) => ({
    ...l,
    count: getCount(l),
  }));
  const liveCustomLists = customLists.map((l) => ({
    ...l,
    count: getCount(l),
  }));

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0078d4" />

      <Header
        onMenuPress={toggleSidebar}
        onSearchPress={() => console.log("Search pressed")}
        onProfilePress={() => console.log("Profile pressed")}
      />

      <View style={styles.mainContainer}>
        {/* Overlay behind sidebar */}
        {sidebarVisible && (
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

        {/* Animated sliding sidebar */}
        {sidebarVisible && (
          <Animated.View
            style={[
              styles.animatedSidebar,
              { transform: [{ translateX: sidebarAnim }] },
            ]}
          >
            <Sidebar
              sidebarLists={liveSidebarLists}
              customLists={liveCustomLists}
              currentList={currentList}
              onSelectList={(list) => {
                setCurrentList(list);
                toggleSidebar(); // close sidebar on selection
              }}
            />
          </Animated.View>
        )}

        {/* Main task list */}
        <MainContent
          currentList={currentList}
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onSelectTask={handleSelectTask}
          onStarToggle={handleStarToggle} // ← was missing
        />

        {/* Right detail panel — only shown when a task is selected */}
        {selectedTask && <RightPanel selectedTask={selectedTask} />}
      </View>
    </SafeAreaView>
  );
};

export default App;
