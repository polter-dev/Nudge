"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const { data: latestPost, isError, isPending } = api.post.getLatest.useQuery(
    undefined,
    { retry: false },
  );

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  if (isPending) {
    return (
      <div className="w-full max-w-xs">
        <p className="text-white/70">Loading posts…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-xs rounded-xl bg-white/10 p-4 text-sm text-white/90">
        <p className="font-semibold">Database not reachable</p>
        <p className="mt-2 text-white/70">
          Start PostgreSQL (see <code className="text-white">DATABASE_URL</code> in{" "}
          <code className="text-white">.env</code>), or open the session UI at{" "}
          <a href="/session/partner/active" className="underline">
            /session/partner/active
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
