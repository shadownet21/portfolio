// Runs in <head> before first paint so the saved theme never flashes.
export const themeScript = `try{const saved=localStorage.getItem("theme");const dark=saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=dark?"dark":"light"}catch{}`;
