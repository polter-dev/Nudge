import { describe, expect, it, vi } from "vitest";

vi.mock("~/env", () => ({
  env: {
    LIVEKIT_API_KEY: "test-api-key",
    LIVEKIT_API_SECRET:
      "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  },
}));

import { createLiveKitToken } from "./token";

function decodeJwtPayload(jwt: string): Record<string, unknown> {
  const parts = jwt.split(".");
  expect(parts.length).toBe(3);
  const payload = parts[1];
  if (!payload) {
    throw new Error("Invalid JWT");
  }
  const json = Buffer.from(payload, "base64url").toString("utf8");
  return JSON.parse(json) as Record<string, unknown>;
}

describe("createLiveKitToken", () => {
  it("returns a JWT with expected identity and room claim", async () => {
    const jwt = await createLiveKitToken({
      roomName: "match-unit-test",
      participantIdentity: "user-uuid-123",
      participantName: "Test User",
      ttlSeconds: 3600,
    });

    const payload = decodeJwtPayload(jwt);
    expect(payload.sub).toBe("user-uuid-123");
    expect(payload.name).toBe("Test User");

    const video = payload.video as Record<string, unknown> | undefined;
    expect(video).toBeDefined();
    expect(video?.room).toBe("match-unit-test");
    expect(video?.roomJoin).toBe(true);
    expect(video?.canPublish).toBe(true);
    expect(video?.canSubscribe).toBe(true);
  });
});
