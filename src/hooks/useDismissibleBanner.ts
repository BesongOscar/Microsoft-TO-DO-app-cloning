/**
 * useDismissibleBanner - Banner visibility state with daily reset
 * 
 * Caches dismissal state in memory and persists to AsyncStorage.
 * Banner auto-reappears the next day after dismissal.
 * Uses a static Map to avoid flash on re-renders.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const bannerCache = new Map<string, boolean | null>();

export const useDismissibleBanner = (key: string) => {
  const cached = bannerCache.get(key);
  const [visible, setVisible] = useState<boolean | null>(cached !== undefined ? cached : null);
  const loadedRef = useRef(cached !== undefined);

  useEffect(() => {
    if (loadedRef.current) return;

    let cancelled = false;
    const load = async () => {
      const stored = await AsyncStorage.getItem(key);
      if (cancelled) return;
      let value: boolean;
      if (stored) {
        const { date, dismissed } = JSON.parse(stored);
        const today = new Date().toISOString().slice(0, 10);
        value = !(date === today && dismissed);
      } else {
        value = true;
      }
      bannerCache.set(key, value);
      setVisible(value);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [key]);

  const dismiss = useCallback(async () => {
    setVisible(false);
    bannerCache.set(key, false);
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ date: new Date().toISOString().slice(0, 10), dismissed: true }),
    );
  }, [key]);

  return { visible, dismiss };
};
