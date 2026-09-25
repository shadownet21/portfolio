"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/types/content";

export function CopyEmail({ email, locale }: { email: string; locale: Locale }) {
  const fr = locale === "fr";
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard can be blocked; the mailto link remains available.
    }
  }

  return (
    <div className="email-row">
      <a href={`mailto:${email}`} className="flex min-w-0 items-center gap-3 font-bold hover:text-[var(--brand)]">
        <Mail className="shrink-0 text-[var(--brand)]" size={20} aria-hidden="true" />
        <span className="truncate">{email}</span>
      </a>
      <button type="button" onClick={copy} className="button-secondary !min-h-9 shrink-0 !px-3 !py-1.5 text-sm">
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {copied ? (fr ? "Copié" : "Copied") : fr ? "Copier" : "Copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{copied ? (fr ? "Adresse copiée" : "Address copied") : ""}</span>
    </div>
  );
}
