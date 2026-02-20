import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Storage key ──────────────────────────────────────────────────────────────
const STORAGE_KEY = "@tasks";

// ─── Default seed data (only used on very first launch) ───────────────────────
const DEFAULT_TASKS = [
  { id: "1", text: "Review quarterly reports",      completed: false, important: true,  myDay: true  },
  { id: "2", text: "Call client about project update", completed: false, important: false, myDay: true  },
  { id: "3", text: "Prepare presentation slides",   completed: false, important: true,  myDay: true  },
  { id: "4", text: "Team meeting at 3 PM",          completed: false, important: false, myDay: false },
  { id: "5", text: "Update project documentation",  completed: true,  important: false, myDay: false },
  { id: "6", text: "Send weekly status report",     completed: true,  important: false, myDay: false },
];

// ─── Context ──────────────────────────────────────────────────────────────────
const TasksContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // true while reading from storage

  // ── Load persisted tasks on first mount ──────────────────────────────────
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setTasks(JSON.parse(stored));
        } else {
          // First launch — seed with defaults
          setTasks(DEFAULT_TASKS);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
        }
      } catch (e) {
        console.warn("Failed to load tasks from storage:", e);
        setTasks(DEFAULT_TASKS); // graceful fallback
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // ── Persist to AsyncStorage whenever tasks change (after initial load) ───
  useEffect(() => {
    if (loading) return; // don't overwrite storage during initial hydration
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((e) =>
      console.warn("Failed to persist tasks:", e),
    );
  }, [tasks, loading]);

  // ── Task actions ─────────────────────────────────────────────────────────

  /** Add a new task to the list */
  const addTask = useCallback((text, listName = "My Day") => {
    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      important: false,
      myDay: listName === "My Day",
    };
    setTasks((prev) => [newTask, ...prev]); // prepend so it appears at the top
  }, []);

  /** Toggle completed state */
  const toggleTask = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  /** Toggle important / star state */
  const toggleImportant = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, important: !t.important } : t)),
    );
  }, []);

  /** Delete a task permanently */
  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  /** Update any field(s) on a task */
  const updateTask = useCallback((taskId, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    );
  }, []);

  // ── Derived counts (memoised so they only recompute when tasks change) ───
  const counts = useMemo(
    () => ({
      myDay:     tasks.filter((t) => t.myDay && !t.completed).length,
      important: tasks.filter((t) => t.important && !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      planned:   tasks.filter((t) => Boolean(t.dueDate)).length,
      all:       tasks.length,
      tasks:     tasks.filter((t) => !t.myDay && !t.important && !t.completed).length,
    }),
    [tasks],
  );

  // ─── Context value ────────────────────────────────────────────────────────
  const value = {
    tasks,
    loading,
    counts,
    addTask,
    toggleTask,
    toggleImportant,
    deleteTask,
    updateTask,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
/**
 * Call inside any component that needs task data or actions.
 *
 * const { tasks, addTask, toggleTask, toggleImportant, counts } = useTasks();
 */
export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks must be used inside a <TasksProvider>");
  }
  return ctx;
};

export default TasksContext;
