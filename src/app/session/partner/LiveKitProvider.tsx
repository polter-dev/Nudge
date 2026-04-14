"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";

import {
  useLiveKitRoom,
  type LiveKitConnectionState,
} from "~/hooks/useLiveKitRoom";

export type LiveKitContextValue = {
  connect: () => Promise<void>;
  disconnect: () => void;
  stopLocalCamera: () => Promise<void>;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  connectionState: LiveKitConnectionState;
  error: string | null;
  roomName: string | null;
  setRoomName: (name: string | null) => void;
};

const LiveKitContext = createContext<LiveKitContextValue | null>(null);

/**
 * Keeps one LiveKit room across matching → active under `/session/partner/*`.
 * Room name comes from `?room=` (e.g. `match-abc123`) or falls back to `match-local-dev` for local testing.
 */
export function LiveKitProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const roomFromUrl = searchParams.get("room");
  const [roomName, setRoomName] = useState<string | null>(
    () => roomFromUrl ?? "match-local-dev",
  );

  useEffect(() => {
    setRoomName(roomFromUrl ?? "match-local-dev");
  }, [roomFromUrl]);

  const live = useLiveKitRoom(roomName);

  const setRoomNameStable = useCallback((name: string | null) => {
    setRoomName(name);
  }, []);

  const value: LiveKitContextValue = {
    connect: live.connect,
    disconnect: live.disconnect,
    stopLocalCamera: live.stopLocalCamera,
    localStream: live.localStream,
    remoteStream: live.remoteStream,
    connectionState: live.connectionState,
    error: live.error,
    roomName,
    setRoomName: setRoomNameStable,
  };

  return (
    <LiveKitContext.Provider value={value}>{children}</LiveKitContext.Provider>
  );
}

export function useLiveKitOptional(): LiveKitContextValue | null {
  return useContext(LiveKitContext);
}
