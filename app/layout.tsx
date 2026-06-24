import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://investor-signal-explorer.vercel.app"),
  title: {
    default: "Investor Signal Explorer",
    template: "%s | Investor Signal Explorer"
  },
  description: "Track the investors, insiders, and policymakers moving the market.",
  openGraph: {
    title: "Investor Signal Explorer",
    description: "Track the investors, insiders, and policymakers moving the market.",
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
