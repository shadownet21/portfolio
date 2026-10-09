import { useRef, type TouchEvent } from "react";

const THRESHOLD = 50;

// Horizontal swipe: calls onSwipe(1) for a swipe to the left (next), onSwipe(-1) to the right.
export function useSwipe(onSwipe: (direction: -1 | 1) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart(event: TouchEvent) {
      const touch = event.touches[0];
      start.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    },
    onTouchEnd(event: TouchEvent) {
      const from = start.current;
      const touch = event.changedTouches[0];
      start.current = null;
      if (!from || !touch) return;
      const dx = touch.clientX - from.x;
      if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(touch.clientY - from.y)) onSwipe(dx < 0 ? 1 : -1);
    },
  };
}
