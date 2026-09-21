import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: "Marc Maurice Freeman — Support TI & Développement Web", template: "%s | Marc Maurice Freeman" },
  description: "Portfolio professionnel de Marc Maurice Freeman : soutien TI, développement web, bases de données et coordination de projets technologiques à Longueuil, Québec.",
  authors: [{ name: "Marc Maurice Freeman" }],
  creator: "Marc Maurice Freeman",
  applicationName: "Portfolio de Marc Maurice Freeman",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const saved=localStorage.getItem("theme");const dark=saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=dark?"dark":"light"}catch{}` }} />
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
