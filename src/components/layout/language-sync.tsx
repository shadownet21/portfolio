"use client";

import { useEffect } from "react";
import type { Locale } from "@/types/content";

export function LanguageSync({ locale }: { locale: Locale }) {
  useEffect(() => { document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA"; }, [locale]);
  return null;
}
