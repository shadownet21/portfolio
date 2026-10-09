import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import { themeScript } from "@/lib/theme-script";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });
// Display face for titles, monospace for the "technical drawing" labels (indexes, queries, tags).
const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });
const siteUrl = getSiteUrl();

export const dynamicParams = false;

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: "Marc Maurice Freeman — Développeur web full stack", template: "%s | Marc Maurice Freeman" },
  description: "Portfolio professionnel de Marc Maurice Freeman : développement web full stack, bases de données et soutien TI à Montréal, Québec.",
  authors: [{ name: "Marc Maurice Freeman" }],
  creator: "Marc Maurice Freeman",
  applicationName: "Portfolio de Marc Maurice Freeman",
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale === "fr" ? "fr-CA" : "en-CA"} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${manrope.className} ${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
