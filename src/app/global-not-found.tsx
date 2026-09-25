import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NotFoundContent } from "@/components/layout/not-found-content";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = { title: "Page introuvable · Page not found — 404" };

export default function GlobalNotFound() {
  return (
    <html lang="fr-CA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={manrope.className}><NotFoundContent /></body>
    </html>
  );
}
