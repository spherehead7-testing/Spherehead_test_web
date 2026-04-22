"use client";

import { useEffect, useRef } from "react";

interface UseCurtainRevealScrollOptions {
  onReveal: () => void;
  onDismiss: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  isAnimating: boolean;
  /** Minimum accumulated wheel delta to trigger (default: 200) */
  threshold?: number;
  /** Minimum touch swipe distance in px to trigger (default: 100) */
  touchThreshold?: number;
}

export default function useCurtainRevealScroll({
  onReveal,
  onDismiss,
  scrollContainerRef,
  isVisible,
  isAnimating,
  threshold = 200,       // ← was 80, needs a very deliberate scroll
  touchThreshold = 100,  // ← was 80, needs a firm swipe
}: UseCurtainRevealScrollOptions) {
  const touchStartY = useRef(0);
  const wheelAccumulator = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Wheel ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      wheelAccumulator.current += e.deltaY;

      // Reset accumulator after 400ms of no scrolling (was 300ms)
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 400);

      if (!isVisible && wheelAccumulator.current > threshold) {
        e.preventDefault();
        wheelAccumulator.current = 0;
        onReveal();
        return;
      }

      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      if (isVisible && scrollTop <= 0 && wheelAccumulator.current < -threshold) {
        e.preventDefault();
        wheelAccumulator.current = 0;
        onDismiss();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, [isVisible, isAnimating, onReveal, onDismiss, threshold]);

  // ── Touch ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;

      if (!isVisible && deltaY > touchThreshold) {
        e.preventDefault();
        onReveal();
        return;
      }

      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      if (isVisible && scrollTop <= 0 && deltaY < -touchThreshold) {
        e.preventDefault();
        onDismiss();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isVisible, isAnimating, onReveal, onDismiss, touchThreshold]);
}