"use client";

import Link from "next/link";

import { cn } from "~/lib/utils";

export function SessionHubEntry({
  variant,
}: {
  variant: "partner" | "solo";
}) {
  const activeHref =
    variant === "partner"
      ? "/session/partner/active"
      : "/session/solo/active";
  const title =
    variant === "partner" ? "Partner session" : "Solo session";
  const description =
    variant === "partner"
      ? "Study with a partner on video. On the next screen, use Turn camera on when you’re ready."
      : "Focus on your own. On the next screen, you can turn your camera on for a local preview.";

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-8 bg-stone-50 px-6 py-12 dark:bg-[#12121A]",
      )}
    >
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <Link
        href={activeHref}
        className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-800"
      >
        Start session
      </Link>
    </div>
  );
}
