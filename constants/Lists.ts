import { ListItem } from "../types";

export const sidebarLists: ListItem[] = [
  { id: "1", name: "My Day",    icon: "☀️",  color: "#0078d4", filterKey: "myDay"     },
  { id: "2", name: "Important", icon: "⭐",  color: "#d83b01", filterKey: "important" },
  { id: "3", name: "Planned",   icon: "📅",  color: "#107c10", filterKey: "planned"   },
  { id: "4", name: "All",       icon: "📝",  color: "#5c2d91", filterKey: "all"       },
  { id: "5", name: "Completed", icon: "✅",  color: "#0078d4", filterKey: "completed" },
  { id: "6", name: "Tasks",     icon: "🏠",  color: "#0078d4", filterKey: "tasks"     },
];
