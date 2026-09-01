"use client";

import { SunMoon } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

export function ThemeToggle({ label }: { label: string }) {
  const dark = useSyncExternalStore(subscribe, getThemeSnapshot, () => false);

  function toggle() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <button type="button" onClick={toggle} className="button-secondary !h-10 !min-h-10 !w-10 !p-0" aria-label={label} aria-pressed={dark} title={label}>
      <SunMoon size={18} aria-hidden="true" />
    </button>
  );
}
