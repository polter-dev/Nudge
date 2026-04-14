import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createLiveKitToken,
  LIVEKIT_TOKEN_TTL_SECONDS,
} from "~/server/livekit/token";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";

/** MVP: only room names with these prefixes are allowed until matchmaking validates membership. */
const ALLOWED_ROOM_PREFIXES = ["match-", "session-"] as const;

function isAllowedRoomName(roomName: string): boolean {
  return ALLOWED_ROOM_PREFIXES.some((p) => roomName.startsWith(p));
}

interface ProfileRow {
  username: string | null;
  first_name: string | null;
  last_name: string | null;
}

export const livekitRouter = createTRPCRouter({
  getToken: protectedProcedure
    .input(z.object({ roomName: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      if (!isAllowedRoomName(input.roomName)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "You cannot join this room. Use a valid match or session room name.",
        });
      }

      // TODO: validate user is a member of this match (replace prefix-only check when matchmaking ships).

      const { data: profileRaw, error: profileError } = await ctx.supabase
        .from("profiles")
        .select("username, first_name, last_name")
        .eq("id", ctx.userObj.id)
        .maybeSingle();

      if (profileError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not load your profile to join video.",
        });
      }

      const profile = profileRaw as ProfileRow | null;

      const fromNames = [profile?.first_name, profile?.last_name]
        .filter((x): x is string => typeof x === "string" && x.length > 0)
        .join(" ")
        .trim();
      const username = profile?.username?.trim();
      const participantName =
        (username && username.length > 0 ? username : null) ??
        (fromNames.length > 0 ? fromNames : null) ??
        ctx.userObj.id;

      const token = await createLiveKitToken({
        roomName: input.roomName,
        participantIdentity: ctx.userObj.id,
        participantName,
        ttlSeconds: LIVEKIT_TOKEN_TTL_SECONDS,
      });

      return {
        token,
        wsUrl: env.NEXT_PUBLIC_LIVEKIT_URL,
        ttlSeconds: LIVEKIT_TOKEN_TTL_SECONDS,
      };
    }),
});
