"use client";

import { useEffect, useRef } from "react";

interface UseCurtainRevealScrollOptions {

  onReveal: () => void;
  onDismiss: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement |null>;
  isVisible: boolean;
  isAnimating: boolean;
  threshold?: number;
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