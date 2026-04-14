"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConnectionState,
  Room,
  RoomEvent,
  Track,
  type DisconnectReason,
  type RemoteParticipant,
  type RemoteTrack,
} from "livekit-client";

import { api } from "~/trpc/react";

/**
 * Tab visibility: when the browser tab is backgrounded, LiveKit may reduce video quality or
 * throttle encoding; no extra handling unless tracks stop entirely.
 */

export type LiveKitConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "error";

export function useLiveKitRoom(roomName: string | null) {
  const utils = api.useUtils();
  const roomRef = useRef<Room | null>(null);
  const connectingRef = useRef(false);
  const tokenRefreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const listenersAttachedRef = useRef(false);
  const fallbackStreamRef = useRef<MediaStream | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connectionState, setConnectionState] =
    useState<LiveKitConnectionState>("disconnected");
  const [error, setError] = useState<string | null>(null);

  const clearTokenTimer = useCallback(() => {
    if (tokenRefreshTimerRef.current) {
      clearTimeout(tokenRefreshTimerRef.current);
      tokenRefreshTimerRef.current = null;
    }
  }, []);

  const syncLocalStream = useCallback((room: Room) => {
    const pub = room.localParticipant.getTrackPublication(Track.Source.Camera);
    const t = pub?.track;
    if (t?.mediaStreamTrack) {
      setLocalStream(new MediaStream([t.mediaStreamTrack]));
    } else {
      setLocalStream(null);
    }
  }, []);

  const detachRoom = useCallback((room: Room) => {
    room.removeAllListeners();
    listenersAttachedRef.current = false;
    void room.disconnect(true);
  }, []);

  const disconnect = useCallback(() => {
    clearTokenTimer();
    const room = roomRef.current;
    roomRef.current = null;
    connectingRef.current = false;
    if (room) {
      detachRoom(room);
    }
    fallbackStreamRef.current?.getTracks().forEach((t) => t.stop());
    fallbackStreamRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setConnectionState("disconnected");
    setError(null);
  }, [clearTokenTimer, detachRoom]);

  const attachRoomListeners = useCallback(
    (room: Room) => {
      if (listenersAttachedRef.current) {
        return;
      }
      listenersAttachedRef.current = true;

      const onLocalTrackPublished = () => {
        syncLocalStream(room);
      };

      const onTrackSubscribed = (
        track: RemoteTrack,
        _publication: unknown,
        participant: RemoteParticipant,
      ) => {
        if (participant.isLocal) return;
        if (track.kind !== Track.Kind.Video) return;
        if (track.mediaStreamTrack) {
          setRemoteStream(new MediaStream([track.mediaStreamTrack]));
        }
      };

      const onTrackUnsubscribed = (
        track: RemoteTrack,
        _publication: unknown,
        participant: RemoteParticipant,
      ) => {
        if (participant.isLocal) return;
        if (track.kind === Track.Kind.Video) {
          setRemoteStream(null);
        }
      };

      const onParticipantDisconnected = () => {
        setRemoteStream(null);
      };

      const onReconnecting = () => {
        setConnectionState("reconnecting");
      };

      const onReconnected = () => {
        setConnectionState("connected");
      };

      const onDisconnected = (reason?: DisconnectReason) => {
        console.warn("[LiveKit] Disconnected", { reason });
        setRemoteStream(null);
        setConnectionState("disconnected");
      };

      const onConnectionStateChanged = (state: ConnectionState) => {
        if (state === ConnectionState.Reconnecting) {
          setConnectionState("reconnecting");
        } else if (state === ConnectionState.Connected) {
          setConnectionState("connected");
        } else if (state === ConnectionState.Disconnected) {
          setConnectionState("disconnected");
        }
      };

      const onLocalTrackUnpublished = () => {
        syncLocalStream(room);
      };

      room.on(RoomEvent.LocalTrackPublished, onLocalTrackPublished);
      room.on(RoomEvent.LocalTrackUnpublished, onLocalTrackUnpublished);
      room.on(RoomEvent.TrackSubscribed, onTrackSubscribed);
      room.on(RoomEvent.TrackUnsubscribed, onTrackUnsubscribed);
      room.on(RoomEvent.ParticipantDisconnected, onParticipantDisconnected);
      room.on(RoomEvent.Reconnecting, onReconnecting);
      room.on(RoomEvent.Reconnected, onReconnected);
      room.on(RoomEvent.Disconnected, onDisconnected);
      room.on(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
    },
    [syncLocalStream],
  );

  const connect = useCallback(async () => {
    if (!roomName) {
      setError("No room is set for video. Add ?room=match-… to the URL.");
      setConnectionState("error");
      return;
    }

    let room = roomRef.current;
    if (!room) {
      room = new Room();
      roomRef.current = room;
    }

    if (room.state !== ConnectionState.Disconnected) {
      return;
    }
    if (connectingRef.current) {
      return;
    }

    connectingRef.current = true;
    setError(null);
    setConnectionState("connecting");

    try {
      const { token, wsUrl, ttlSeconds } =
        await utils.livekit.getToken.fetch({ roomName });

      attachRoomListeners(room);

      await room.connect(wsUrl, token, { autoSubscribe: true });
      await room.localParticipant.enableCameraAndMicrophone();
      await room.localParticipant.setMicrophoneEnabled(false);
      syncLocalStream(room);
      setConnectionState("connected");

      clearTokenTimer();
      const delayMs = ttlSeconds * 1000 * 0.8;
      tokenRefreshTimerRef.current = setTimeout(() => {
        console.warn(
          "[LiveKit] Token passed 80% of TTL; re-fetching before LiveKit reports expiry",
        );
        void utils.livekit.getToken.fetch({ roomName }).catch((err) => {
          console.warn("[LiveKit] Proactive token re-fetch failed", err);
        });
      }, delayMs);
    } catch (e) {
      // DEV BYPASS: if token fetch / LiveKit connection fails (e.g. not logged in),
      // fall back to a direct getUserMedia for local camera preview only.
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        fallbackStreamRef.current = stream;
        setLocalStream(stream);
        setConnectionState("connected");
        connectingRef.current = false;
        return;
      } catch {
        // camera also unavailable — fall through to normal error handling
      }

      const message =
        e instanceof Error ? e.message : "Could not start video session.";
      setError(message);
      setConnectionState("error");
      if (roomRef.current) {
        detachRoom(roomRef.current);
        roomRef.current = null;
      }
      listenersAttachedRef.current = false;
    } finally {
      connectingRef.current = false;
    }
  }, [
    roomName,
    utils.livekit.getToken,
    attachRoomListeners,
    syncLocalStream,
    clearTokenTimer,
    detachRoom,
  ]);

  const stopLocalCamera = useCallback(async () => {
    // DEV BYPASS: local-only mode — no LiveKit room, just a raw MediaStream
    if (!roomRef.current || roomRef.current.state === ConnectionState.Disconnected) {
      if (fallbackStreamRef.current) {
        fallbackStreamRef.current.getTracks().forEach((t) => t.stop());
        fallbackStreamRef.current = null;
        setLocalStream(null);
      }
      return;
    }
    const room = roomRef.current;
    try {
      await room.localParticipant.setCameraEnabled(false);
      syncLocalStream(room);
    } catch (e) {
      console.warn("[LiveKit] Could not turn camera off", e);
    }
  }, [syncLocalStream]);

  useEffect(() => {
    return () => {
      clearTokenTimer();
      const room = roomRef.current;
      roomRef.current = null;
      connectingRef.current = false;
      if (room) {
        detachRoom(room);
      }
      fallbackStreamRef.current?.getTracks().forEach((t) => t.stop());
      fallbackStreamRef.current = null;
      setLocalStream(null);
      setRemoteStream(null);
      setConnectionState("disconnected");
      setError(null);
    };
  }, [roomName, clearTokenTimer, detachRoom]);

  return {
    connect,
    disconnect,
    stopLocalCamera,
    localStream,
    remoteStream,
    connectionState,
    error,
  };
}
