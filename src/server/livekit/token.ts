import { AccessToken } from "livekit-server-sdk";

import { env } from "~/env";

/** Default access token lifetime (4 hours). */
export const LIVEKIT_TOKEN_TTL_SECONDS = 4 * 60 * 60;

/**
 * Mints a short-lived LiveKit JWT for an authenticated participant.
 * @returns JWT string (async because `toJwt()` is async in the SDK).
 */
export async function createLiveKitToken({
  roomName,
  participantIdentity,
  participantName,
  ttlSeconds = LIVEKIT_TOKEN_TTL_SECONDS,
}: {
  roomName: string;
  participantIdentity: string;
  participantName: string;
  ttlSeconds?: number;
}): Promise<string> {
  const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: participantIdentity,
    name: participantName,
    ttl: ttlSeconds,
  });
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });
  return at.toJwt();
}
