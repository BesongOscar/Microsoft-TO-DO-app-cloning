/**
 * normalize - Firestore data deserialization helpers
 * 
 * Firestore returns data as Record<string, unknown>. These functions
 * safely cast fields to their expected types with sensible defaults,
 * preventing undefined/null errors in the UI layer.
 */

import { Task, CustomList, RepeatType } from "../../types";

export const normalizeTask = (data: Record<string, unknown>): Task => ({
  id: (data.id as string) ?? "",
  text: (data.text as string) ?? "",
  completed: (data.completed as boolean) ?? false,
  important: (data.important as boolean) ?? false,
  myDay: (data.myDay as boolean) ?? false,
  listId: data.listId as string | undefined,
  order: data.order as number | undefined,
  dueDate: data.dueDate as string | undefined,
  dueTime: data.dueTime as string | undefined,
  reminder: data.reminder as string | undefined,
  note: data.note as string | undefined,
  repeat: data.repeat as RepeatType | undefined,
  repeatDays: data.repeatDays as number[] | undefined,
  repeatOnDay: data.repeatOnDay as number | undefined,
  repeatOnLastDay: data.repeatOnLastDay as boolean | undefined,
  repeatEndDate: data.repeatEndDate as string | undefined,
  createdAt: data.createdAt as number | undefined,
});

export const normalizeCustomList = (data: Record<string, unknown>): CustomList => ({
  id: (data.id as string) ?? "",
  name: (data.name as string) ?? "",
  icon: (data.icon as string) ?? "📋",
  color: (data.color as string) ?? "#0078d4",
  createdAt: data.createdAt as number | undefined,
});
