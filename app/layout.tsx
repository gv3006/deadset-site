import type { Metadata } from "next";
import { headers } from "next/headers";
import { Newsreader, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const display = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const editorial = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Deadset — Madison, Wisconsin",
    description: "Deadset's live archive, upcoming shows, hand-drawn marks, and booking contact.",
    icons: { icon: "/media/logo5.png", shortcut: "/media/logo5.png" },
    openGraph: {
      title: "Deadset — Madison, Wisconsin",
      description: "Live archive 2025—now.",
      type: "website",
      images: [{ url: "/og.jpg", width: 1731, height: 909, alt: "Deadset live archive in Madison, Wisconsin" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Deadset — Madison, Wisconsin",
      description: "Live archive 2025—now.",
      images: ["/og.jpg"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${editorial.variable}`}>{children}</body>
    </html>
  );
}
