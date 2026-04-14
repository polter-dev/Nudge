import { Suspense, type ReactNode } from "react";

import { LiveKitProvider } from "./LiveKitProvider";

export default function PartnerSessionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <LiveKitProvider>{children}</LiveKitProvider>
    </Suspense>
  );
}
