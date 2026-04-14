"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  useLiveKitOptional,
  type LiveKitContextValue,
} from "~/app/session/partner/LiveKitProvider";
import { VideoFeed } from "~/components/session/VideoFeed";
import { classifyCameraError } from "~/lib/cameraErrorKind";
import { cn } from "~/lib/utils";

export function MatchingClient() {
  const liveKitHook = useLiveKitOptional();
  if (!liveKitHook) {
    throw new Error("LiveKitProvider is required for matching.");
  }
  const liveKit: LiveKitContextValue = liveKitHook;

  const [cameraDenied, setCameraDenied] = useState(false);
  const [cameraNotFound, setCameraNotFound] = useState(false);

  useEffect(() => {
    if (!liveKit.error) {
      return;
    }
    const kind = classifyCameraError(liveKit.error);
    setCameraDenied(kind === "denied");
    setCameraNotFound(kind === "notfound");
  }, [liveKit.error]);

  async function handleEnableCamera() {
    setCameraDenied(false);
    setCameraNotFound(false);
    await liveKit.connect();
  }

  const isConnecting = liveKit.connectionState === "connecting";
  const isReconnecting = liveKit.connectionState === "reconnecting";

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 p-6 dark:bg-[#12121A]">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Partner matching
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Room:{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              {liveKit.roomName ?? "—"}
            </code>
            . Real matchmaking will supply this in a future sprint.
          </p>
        </header>

        {cameraDenied && (
          <div
            role="alert"
            className="rounded-lg border border-amber-600/40 bg-amber-500/15 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100"
          >
            Camera permission denied — nudge tracking won&apos;t be available
            this session.
          </div>
        )}

        {cameraNotFound && (
          <div
            role="alert"
            className="rounded-lg border border-red-600/40 bg-red-500/15 px-4 py-3 text-sm text-red-950 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-100"
          >
            No camera found. Connect a camera or check system settings.
          </div>
        )}

        {isReconnecting && (
          <div
            role="status"
            className="rounded-lg border border-blue-600/40 bg-blue-500/15 px-4 py-3 text-sm text-blue-950 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100"
          >
            Reconnecting…
          </div>
        )}

        {liveKit.error && !cameraDenied && !cameraNotFound && (
          <div
            role="alert"
            className="rounded-lg border border-red-600/40 bg-red-500/15 px-4 py-3 text-sm text-red-950 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-100"
          >
            {liveKit.error}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => void handleEnableCamera()}
                className="rounded-md bg-red-900/20 px-3 py-1.5 text-xs font-medium text-red-950 hover:bg-red-900/30 dark:bg-red-400/20 dark:text-red-50 dark:hover:bg-red-400/30"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div
            className={cn(
              "relative aspect-video overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-[#3F3F46] dark:bg-[#27272A]",
            )}
          >
            <VideoFeed stream={liveKit.localStream} variant="user" />
            {isConnecting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
              </div>
            )}
          </div>

          <div
            className={cn(
              "relative aspect-video overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-[#3F3F46] dark:bg-[#27272A]",
            )}
          >
            <VideoFeed stream={liveKit.remoteStream} variant="partner" />
            {isConnecting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void handleEnableCamera()}
            disabled={isConnecting}
            className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Enable camera
          </button>
          <Link
            href={`/session/partner/active${liveKit.roomName ? `?room=${encodeURIComponent(liveKit.roomName)}` : ""}`}
            className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-[#3F3F46] dark:text-zinc-100 dark:hover:bg-zinc-800/50"
          >
            Continue to active session
          </Link>
        </div>
      </div>
    </div>
  );
}
