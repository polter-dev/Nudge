"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[PartnerSession] Error:", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="max-w-sm text-sm text-zinc-400">
          {error.message ?? "An unexpected error occurred during your session."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
