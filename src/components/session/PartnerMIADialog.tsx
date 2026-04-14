"use client";

import Link from "next/link";

interface PartnerMIADialogProps {
  isOpen: boolean;
}

export function PartnerMIADialog({ isOpen }: PartnerMIADialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xl">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-2xl">
        <p className="text-base text-zinc-800">
          Your partner has disconnected due to being MIA for too long. This won&apos;t affect your Nudge Score.
          Let&apos;s find you a new partner!
        </p>
        <Link
          href="/session/partner/matching"
          className="mt-6 inline-flex rounded-full bg-[#6D28D9] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#5B21B6] active:bg-[#4C1D95]"
        >
          Start Matching
        </Link>
      </div>
    </div>
  );
}
