"use client";

import { useEffect, useRef } from "react";

interface UseCurtainRevealScrollOptions {
  onReveal: () => void;
  onDismiss: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
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
  threshold = 200,
  touchThreshold = 100,
}: UseCurtainRevealScrollOptions) {
  const touchStartY = useRef(0);
  const wheelAccumulator = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Wheel ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      const isScrollingUp = e.deltaY < 0;

      // ✨ THE FIX: Kill the native touchpad bounce immediately!
      // If we are closed (Hero), or if we are open but at the very top trying to scroll up,
      // prevent the default native scroll BEFORE the threshold math even starts.
      if (!isVisible) {
        e.preventDefault(); 
      } else if (isVisible && scrollTop <= 0 && isScrollingUp) {
        e.preventDefault();
      }

      wheelAccumulator.current += e.deltaY;

      // Reset accumulator after 400ms of no scrolling
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 400);

      if (!isVisible && wheelAccumulator.current > threshold) {
        wheelAccumulator.current = 0;
        onReveal();
        return;
      }

      if (isVisible && scrollTop <= 0 && wheelAccumulator.current < -threshold) {
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
      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      const isSwipingUpToDown = deltaY < 0; // Finger moving down, trying to pull screen down

      // ✨ THE FIX: Apply the same bounce protection to mobile/touch swiping
      if (!isVisible) {
        e.preventDefault();
      } else if (isVisible && scrollTop <= 0 && isSwipingUpToDown) {
        e.preventDefault();
      }

      if (!isVisible && deltaY > touchThreshold) {
        onReveal();
        return;
      }

      if (isVisible && scrollTop <= 0 && deltaY < -touchThreshold) {
        onDismiss();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    // Note: passive MUST be false here so e.preventDefault() works
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isVisible, isAnimating, onReveal, onDismiss, touchThreshold]);
}