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
import { Task, ListItem } from "../types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Review quarterly reports",        completed: false, important: true,  myDay: true  },
    { id: "2", text: "Call client about project update", completed: false, important: false, myDay: true  },
    { id: "3", text: "Prepare presentation slides",      completed: false, important: true,  myDay: true  },
    { id: "4", text: "Team meeting at 3 PM",             completed: false, important: false, myDay: false },
    { id: "5", text: "Update project documentation",     completed: true,  important: false, myDay: false },
    { id: "6", text: "Send weekly status report",        completed: true,  important: false, myDay: false },
  ]);

  const [currentList, setCurrentList]     = useState<ListItem>({ id: "1", name: "My Day", icon: "☀️", color: "#0078d4", filterKey: "myDay" });
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>("1");
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const selectedTask: Task | undefined = tasks.find((task) => task.id === selectedTaskId);

  // Sidebar animation
  const sidebarAnim = useRef(new Animated.Value(-250)).current;

  const toggleSidebar = (): void => {
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

  // Task handlers
  const handleAddTask = (text: string): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      important: false,
      myDay: currentList.name === "My Day",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTask = (taskId: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleStarToggle = (taskId: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task,
      ),
    );
  };

  const handleSelectTask = (taskId: string): void => {
    setSelectedTaskId(taskId);
  };

  const handleEditTask = (taskId: string, newText: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
    }
  };

  // Dynamic counts for sidebar lists
  const getCount = (list: ListItem): number => {
    switch (list.filterKey) {
      case "myDay":     return tasks.filter((t) => t.myDay && !t.completed).length;
      case "important": return tasks.filter((t) => t.important && !t.completed).length;
      case "completed": return tasks.filter((t) => t.completed).length;
      case "all":       return tasks.length;
      case "planned":   return tasks.filter((t) => Boolean(t.dueDate)).length;
      case "tasks":     return tasks.filter((t) => !t.myDay && !t.important && !t.completed).length;
      case "listId":    return tasks.filter((t) => t.listId === list.id && !t.completed).length;
      default:          return 0;
    }
  };

  const liveSidebarLists: ListItem[] = sidebarLists.map((l) => ({ ...l, count: getCount(l) }));
  const liveCustomLists: ListItem[]  = customLists.map((l)  => ({ ...l, count: getCount(l) }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0078d4" />

      <Header
        onMenuPress={toggleSidebar}
        onSearchPress={() => console.log("Search pressed")}
        onProfilePress={() => console.log("Profile pressed")}
      />

      <View style={styles.mainContainer}>
        {sidebarVisible && (
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

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
              onSelectList={(list: ListItem) => {
                setCurrentList(list);
                toggleSidebar();
              }}
            />
          </Animated.View>
        )}

        <MainContent
          currentList={currentList}
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onSelectTask={handleSelectTask}
          onStarToggle={handleStarToggle}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        {selectedTask && (
          <RightPanel
            selectedTask={selectedTask}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
