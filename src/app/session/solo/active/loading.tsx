export default function Loading() {
  return (
    <div className="flex h-screen w-full animate-pulse bg-zinc-950">
      {/* Sidebar skeleton */}
      <div className="w-10 shrink-0 bg-zinc-900" />

      <div className="flex flex-1 flex-col">
        {/* Top bar skeleton */}
        <div className="flex h-12 items-center justify-center border-b border-zinc-800">
          <div className="h-4 w-16 rounded bg-zinc-800" />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left column — video area */}
          <div className="flex w-[60%] flex-col gap-3 p-4">
            <div className="h-8 w-full rounded bg-zinc-800" />
            <div className="flex-1 rounded-xl bg-zinc-900" />
            <div className="h-10 w-full rounded-lg bg-zinc-800" />
            <div className="flex-1 rounded-xl bg-zinc-900" />
          </div>

          {/* Right column — task panel */}
          <div className="flex w-[40%] flex-col gap-3 bg-zinc-900 p-4">
            <div className="h-10 w-1/2 rounded bg-zinc-800" />
            <div className="h-8 w-full rounded bg-zinc-800" />
            <div className="flex-1 rounded-xl bg-zinc-800" />
            <div className="h-32 w-full rounded-xl bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
