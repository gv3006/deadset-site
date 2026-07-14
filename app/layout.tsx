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
    description: "Deadset is an indie rock band from Madison, Wisconsin. Live shows, posters, and booking.",
    icons: { icon: "/media/logo7.png", shortcut: "/media/logo7.png" },
    openGraph: {
      title: "Deadset — Madison, Wisconsin",
      description: "Indie rock from Madison, Wisconsin. Shows, posters, and booking.",
      type: "website",
      images: [{ url: "/og-poster.png", width: 1659, height: 948, alt: "Deadset, indie rock from Madison, Wisconsin" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Deadset — Madison, Wisconsin",
      description: "Indie rock from Madison, Wisconsin. Shows, posters, and booking.",
      images: ["/og-poster.png"],
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
