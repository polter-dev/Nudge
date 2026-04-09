import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Nudge",
  description: "Peer accountability and focused work sessions",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const csGordon = localFont({
  src: [
    {
      path: "../../public/fonts/CSGordonRegular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-cs-gordon",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${csGordon.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
