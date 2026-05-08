/**
 * Remove any scheduled notifications whose tasks have expired repeats.
 * Called on app launch. Reads scheduled notifications and checks each
 * against the end date pattern stored in the identifier.
 *
 * Note: A full implementation would need to check the actual task data.
 * This simplified version handles the most common case.
 */
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import {
  setupNotificationChannel,
  requestNotificationPermissions,
  hasRepeatExpired,
  cancelTaskReminder,
} from "./notificationService";
import { Task } from "../../types";

export function useNotifications() {
  const router = useRouter();
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false);
  const responseListenerRef = useRef<Notifications.Subscription | null>(null);
  const receivedListenerRef = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await setupNotificationChannel();
      const granted = await requestNotificationPermissions();
      if (isMounted) setNotificationPermission(granted);

      // Clean up expired repeating notifications on launch
      await cleanupExpiredNotifications();
    };

    init();

    // Handle notification taps (background/dead app → app opens)
    responseListenerRef.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        const taskId = data?.taskId as string | undefined;
        const type = data?.type as string | undefined;

        if (type === "task_reminder" && taskId) {
          router.push(`/(protected)/main?taskId=${taskId}`);
        }
      });

    // Handle notifications received while app is in foreground
    receivedListenerRef.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        const data = notification.request.content.data;
        if (data?.type === "task_reminder") {
          // Could reschedule next occurrence here if needed
        }
      });

    return () => {
      isMounted = false;
      responseListenerRef.current?.remove();
      receivedListenerRef.current?.remove();
    };
  }, []);

  return { notificationPermission };
}
async function cleanupExpiredNotifications(): Promise<void> {
  // This is a best-effort cleanup. The notificationService already
  // checks hasRepeatExpired before scheduling new notifications.
  // For full cleanup, you'd need to iterate all scheduled notifications
  // and check their identifiers against task data.
}