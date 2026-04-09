"use client";

import { VideoOff } from "lucide-react";
import { useEffect, useRef } from "react";

interface VideoFeedProps {
  stream: MediaStream | null;
  variant: "user" | "partner";
}

export function VideoFeed({ stream, variant }: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-200">
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted={variant === "user"} // mute self to avoid feedback
          playsInline
          className="h-full w-full object-cover"
          aria-label={variant === "user" ? "Your camera feed" : "Partner camera feed"}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-zinc-400">
          <VideoOff size={32} strokeWidth={1.5} />
          <span className="text-xs">
            {variant === "user" ? "Camera off" : "Waiting for partner…"}
          </span>
        </div>
      )}
    </div>
  );
}
