"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WARNING_MS = 180_000;
const DISCONNECT_MS = 300_000;

export function useCameraGuard(
  cameraIsOn: boolean,
  onDisconnect: () => void,
): {
  showWarning: boolean;
  resetGuard: () => void;
} {
  const [showWarning, setShowWarning] = useState(false);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasEverBeenOn = useRef(false);
  const onDisconnectRef = useRef(onDisconnect);

  useEffect(() => {
    onDisconnectRef.current = onDisconnect;
  }, [onDisconnect]);

  const resetGuard = useCallback(() => {
    if (warningTimerRef.current !== null) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (disconnectTimerRef.current !== null) {
      clearTimeout(disconnectTimerRef.current);
      disconnectTimerRef.current = null;
    }
    setShowWarning(false);
  }, []);

  useEffect(() => {
    if (cameraIsOn) {
      hasEverBeenOn.current = true;
      resetGuard();
      return;
    }

    if (!hasEverBeenOn.current) {
      return;
    }

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      void new Audio("/sounds/mixkit-clear-announce-tones-2861.mp3")
        .play()
        .catch(() => undefined);
    }, WARNING_MS);

    disconnectTimerRef.current = setTimeout(() => {
      onDisconnectRef.current();
    }, DISCONNECT_MS);

    return () => {
      if (warningTimerRef.current !== null) {
        clearTimeout(warningTimerRef.current);
        warningTimerRef.current = null;
      }
      if (disconnectTimerRef.current !== null) {
        clearTimeout(disconnectTimerRef.current);
        disconnectTimerRef.current = null;
      }
    };
  }, [cameraIsOn, resetGuard]);

  useEffect(() => {
    return () => {
      if (warningTimerRef.current !== null) {
        clearTimeout(warningTimerRef.current);
      }
      if (disconnectTimerRef.current !== null) {
        clearTimeout(disconnectTimerRef.current);
      }
    };
  }, []);

  return { showWarning, resetGuard };
}
