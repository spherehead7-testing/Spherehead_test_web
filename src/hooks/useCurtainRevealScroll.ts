"use client";

import { useEffect, useRef } from "react";

interface UseCurtainRevealScrollOptions {
  /** Called when user scrolls DOWN on the hero (curtain should open) */
  onReveal: () => void;
  /** Called when user scrolls UP at the top of the panel (curtain should close) */
  onDismiss: () => void;
  /** Ref to the scrollable inner container of the panel */
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  /** Whether the panel is currently visible */
  isVisible: boolean;
  /** Whether a transition is in progress (prevents double-firing) */
  isAnimating: boolean;
  /** Minimum wheel deltaY to trigger reveal/dismiss (default: 10) */
  threshold?: number;
  /** Minimum touch swipe distance in px to trigger (default: 30) */
  touchThreshold?: number;
}

export default function useCurtainRevealScroll({
  onReveal,
  onDismiss,
  scrollContainerRef,
  isVisible,
  isAnimating,
  threshold = 10,
  touchThreshold = 30,
}: UseCurtainRevealScrollOptions) {
  const touchStartY = useRef(0);

  // ── Wheel ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      if (!isVisible && e.deltaY > threshold) {
        e.preventDefault();
        onReveal();
        return;
      }

      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      if (isVisible && scrollTop <= 0 && e.deltaY < -threshold) {
        e.preventDefault();
        onDismiss();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
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