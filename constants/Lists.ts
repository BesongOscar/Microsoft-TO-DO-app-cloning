import { ListItem } from "../types";

// Each list has a `filterKey` that TasksContext.counts uses to derive live badge numbers.
export const sidebarLists: ListItem[] = [
  { id: "1", name: "My Day",    icon: "☀️",  color: "#0078d4", filterKey: "myDay"     },
  { id: "2", name: "Important", icon: "⭐",  color: "#d83b01", filterKey: "important" },
  { id: "3", name: "Planned",   icon: "📅",  color: "#107c10", filterKey: "planned"   },
  { id: "4", name: "All",       icon: "📝",  color: "#5c2d91", filterKey: "all"       },
  { id: "5", name: "Completed", icon: "✅",  color: "#0078d4", filterKey: "completed" },
  { id: "6", name: "Tasks",     icon: "🏠",  color: "#0078d4", filterKey: "tasks"     },
];

export const customLists: ListItem[] = [
  { id: "7", name: "Work Projects", icon: "📋", color: "#8764b8", filterKey: "listId" },
  { id: "8", name: "Personal",      icon: "🏠", color: "#00bcf2", filterKey: "listId" },
];
