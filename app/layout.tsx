import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://investina.vercel.app"),
  title: {
    default: "Investina",
    template: "%s | Investina"
  },
  description: "Track superinvestors, insiders, and political trades in one research dashboard.",
  openGraph: {
    title: "Investina",
    description: "Track superinvestors, insiders, and political trades in one research dashboard.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
