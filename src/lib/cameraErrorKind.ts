export type CameraErrorKind = "denied" | "notfound" | "other";

export function classifyCameraError(message: string): CameraErrorKind {
  const m = message.toLowerCase();
  if (
    m.includes("notallowed") ||
    m.includes("permission denied") ||
    m.includes("denied")
  ) {
    return "denied";
  }
  if (
    m.includes("notfound") ||
    m.includes("no camera") ||
    m.includes("devices")
  ) {
    return "notfound";
  }
  return "other";
}
