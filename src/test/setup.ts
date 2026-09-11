import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom has no viewport; browser verification covers actual reveal behavior.
vi.stubGlobal("IntersectionObserver", class {
  observe() {}
  unobserve() {}
  disconnect() {}
});
