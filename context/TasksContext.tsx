import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Alert } from "react-native";
import { Task, TaskCounts } from "../types";
import { useAuth } from "@/context/AuthContext";
import {
  firestoreGetTasks,
  firestoreSaveTasks,
  firestoreDeleteTask,
  firestoreUpdateTask,
} from "@/src/firebase/tasks";
import { useTaskNotifications } from "../src/hooks/useTaskNotifications";
import i18n from "@/src/i18n";

// ── Data context (triggers re-render on state change) ─────────────────────

interface TasksData {
  tasks: Task[];
  loading: boolean;
  refreshing: boolean;
  counts: TaskCounts;
  selectedTaskId: string | null;
}

const TasksDataContext = createContext<TasksData | null>(null);

// ── Actions context (stable callbacks, no re-render) ──────────────────────

interface TasksActions {
  addTask: (text: string, listName?: string, listId?: string) => void;
  toggleTask: (taskId: string) => void;
  toggleImportant: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  refreshTasks: () => Promise<void>;
  reorderTasks: (reorderedPendingTasks: Task[]) => void;
  setSelectedTaskId: (id: string | null) => void;
}

const TasksActionsContext = createContext<TasksActions | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tasksRef = useRef<Task[]>([]);
  const userRef = useRef(user);

  //keep refs in sync:
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const { onTasksLoaded, onTaskToggled, onTaskUpdated, onTaskDeleted } =
    useTaskNotifications();

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    const loadTasks = async (): Promise<void> => {
      if (!user) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const loadedTasks = await firestoreGetTasks(user.uid);

        if (cancelled) return;

        if (loadedTasks.length > 0) {
          const pendingTasks = loadedTasks.filter((t) => !t.completed);
          const completedTasks = loadedTasks.filter((t) => t.completed);

          let orderCounter = 0;
          const pendingWithOrder = pendingTasks.map((task) => {
            if (task.order === undefined) {
              return { ...task, order: orderCounter++ };
            }
            return task;
          });

          pendingWithOrder.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          setTasks([...pendingWithOrder, ...completedTasks]);
        } else {
          setTasks([]);
        }

        onTasksLoaded(loadedTasks);
      } catch (e) {
        console.warn("Failed to load tasks from Firestore:", e);
        if (!cancelled) setTasks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTasks();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.uid]);

  const debouncedSaveTasks = useCallback((newTasks: Task[]) => {
    const currentUser = userRef.current;
    if (!currentUser) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      const uid = userRef.current?.uid;
      if (!uid) return;
      try {
        await firestoreSaveTasks(uid, newTasks);
      } catch (e) {
        console.warn("Failed to save tasks to Firestore:", e);
        Alert.alert(i18n.t("errors.save_failed"), "", [
          { text: i18n.t("common.ok") },
        ]);
      }
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const addTask = useCallback(
    (text: string, listName?: string, listId?: string): void => {
      const newTask: Task = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        text: text.trim(),
        completed: false,
        important: false,
        myDay: listName === "My Day",
        listId: listId,
        order: 0,
        createdAt: Date.now(),
      };
      setTasks((prev) => {
        const updated = [
          newTask,
          ...prev.map((t) =>
            t.completed ? t : { ...t, order: (t.order ?? 0) + 1 },
          ),
        ];
        setTimeout(() => debouncedSaveTasks(updated), 0);
        return updated;
      });
    },
    [debouncedSaveTasks],
  );

  const toggleTask = useCallback(
    (taskId: string): void => {
      const prevSnapshot = {
        ...tasksRef.current.find((t) => t.id === taskId),
      } as Task | null;
      if (!prevSnapshot) return;

      const willBeCompleted = !prevSnapshot.completed;
      let newOrder: number | undefined;

      if (!willBeCompleted) {
        const maxOrder = tasksRef.current
          .filter((t) => !t.completed && t.order !== undefined)
          .reduce((max, t) => Math.max(max, t.order ?? 0), -1);
        newOrder = maxOrder + 1;
      }

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, completed: willBeCompleted, order: newOrder }
            : t,
        ),
      );

      if (user) {
        firestoreUpdateTask(user.uid, taskId, {
          completed: willBeCompleted,
          order: newOrder,
        }).catch((e) => {
          console.warn("Failed to toggle task in Firestore:", e);
          Alert.alert(i18n.t("errors.save_failed"), "", [
            { text: i18n.t("common.ok") },
          ]);
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    completed: prevSnapshot.completed,
                    order: prevSnapshot.order,
                  }
                : t,
            ),
          );
        });
      }

      onTaskToggled(prevSnapshot, willBeCompleted);
    },
    [user, onTaskToggled],
  );

  const toggleImportant = useCallback(
    (taskId: string): void => {
      const prevSnapshot = {
        ...tasksRef.current.find((t) => t.id === taskId),
      } as Task | null;
      if (!prevSnapshot) return;

      const newImportant = !prevSnapshot.important;

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, important: newImportant } : t,
        ),
      );

      if (user) {
        firestoreUpdateTask(user.uid, taskId, {
          important: newImportant,
        }).catch((e) => {
          console.warn("Failed to toggle important in Firestore:", e);
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId ? { ...t, important: prevSnapshot.important } : t,
            ),
          );
        });
      }
    },
    [user],
  );

  const deleteTask = useCallback(
    (taskId: string): void => {
      const prevTask = tasksRef.current.find((t) => t.id === taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      onTaskDeleted(taskId);
      if (user && prevTask) {
        firestoreDeleteTask(user.uid, taskId).catch((e) => {
          console.warn("Failed to delete task from Firestore:", e);
          setTasks((prev) => {
            if (prev.some((t) => t.id === taskId)) return prev;
            return [...prev, prevTask];
          });
          Alert.alert(i18n.t("errors.delete_failed"), "", [
            { text: i18n.t("common.ok") },
          ]);
        });
      }
    },
    [user, onTaskDeleted],
  );

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>): void => {
      const prevTask = tasksRef.current.find((t) => t.id === taskId);

      setTasks((prev) => {
        const updated = prev.map((t) =>
          t.id === taskId ? { ...t, ...updates } : t,
        );
        return updated;
      });
      if (prevTask) {
        onTaskUpdated(prevTask, updates);
      }
      if (user && prevTask) {
        firestoreUpdateTask(user.uid, taskId, updates).catch((e) => {
          console.warn("Failed to update task in Firestore:", e);
          setTasks((prev) => prev.map((t) => (t.id === taskId ? prevTask : t)));
          Alert.alert(i18n.t("errors.update_failed"), "", [
            { text: i18n.t("common.ok") },
          ]);
        });
      }
    },
    [user, onTaskUpdated],
  );

  const refreshTasks = useCallback(async (): Promise<void> => {
    if (!user) return;
    setRefreshing(true);
    try {
      const loadedTasks = await firestoreGetTasks(user.uid);

      const pendingTasks = loadedTasks.filter((t) => !t.completed);
      const completedTasks = loadedTasks.filter((t) => t.completed);

      let orderCounter = 0;
      const pendingWithOrder = pendingTasks.map((task) => {
        if (task.order === undefined) {
          return { ...task, order: orderCounter++ };
        }
        return task;
      });

      pendingWithOrder.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      setTasks([...pendingWithOrder, ...completedTasks]);
    } catch (e) {
      console.warn("Failed to refresh tasks:", e);
      Alert.alert(i18n.t("errors.refresh_failed"), "", [
        { text: i18n.t("common.ok") },
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [user?.uid]);

  const reorderTasks = useCallback(
    (reorderedPendingTasks: Task[]): void => {
      const updatedPending = reorderedPendingTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      setTasks((prev) => {
        const completedTasks = prev.filter((t) => t.completed);
        const newTasks = [...updatedPending, ...completedTasks];
        debouncedSaveTasks(newTasks);
        return newTasks;
      });
    },
    [debouncedSaveTasks],
  );

  const counts = useMemo<TaskCounts>(
    () => ({
      myDay: tasks.filter((t) => t.myDay && !t.completed).length,
      important: tasks.filter((t) => t.important && !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      planned: tasks.filter((t) => Boolean(t.dueDate) && !t.completed).length,
      all: tasks.length,
      tasks: tasks.filter((t) => !t.myDay && !t.important && !t.completed)
        .length,
    }),
    [tasks],
  );

  const dataValue = useMemo<TasksData>(
    () => ({ tasks, loading, refreshing, counts, selectedTaskId }),
    [tasks, loading, refreshing, counts, selectedTaskId],
  );

  const actionsValue = useMemo<TasksActions>(
    () => ({
      addTask,
      toggleTask,
      toggleImportant,
      deleteTask,
      updateTask,
      refreshTasks,
      reorderTasks,
      setSelectedTaskId,
    }),
    [
      addTask,
      toggleTask,
      toggleImportant,
      deleteTask,
      updateTask,
      refreshTasks,
      reorderTasks,
      setSelectedTaskId,
    ],
  );

  return (
    <TasksDataContext.Provider value={dataValue}>
      <TasksActionsContext.Provider value={actionsValue}>
        {children}
      </TasksActionsContext.Provider>
    </TasksDataContext.Provider>
  );
};

export const useTasksData = (): TasksData => {
  const ctx = useContext(TasksDataContext);
  if (!ctx) throw new Error("useTasksData must be inside <TasksProvider>");
  return ctx;
};

export const useTasksActions = (): TasksActions => {
  const ctx = useContext(TasksActionsContext);
  if (!ctx) throw new Error("useTasksActions must be inside <TasksProvider>");
  return ctx;
};

export const useTasks = (): TasksData & TasksActions => ({
  ...useTasksData(),
  ...useTasksActions(),
});
