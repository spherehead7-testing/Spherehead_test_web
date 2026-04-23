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
  const scrollStartTop = useRef(0); 

  // ── Wheel ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      const isScrollingUp = e.deltaY < 0;

      // If the accumulator is 0, this is a brand new scroll.
      // Record where the scrollbar is starting!
      if (wheelAccumulator.current === 0) {
        scrollStartTop.current = scrollTop;
      }

      // Prevent native scroll bounce immediately on bounds
      if (!isVisible) {
        e.preventDefault(); 
      } else if (isVisible && scrollTop <= 2 && isScrollingUp) { 
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

      if (isVisible && scrollTop <= 2 && wheelAccumulator.current < -threshold) {
        // ✨ THE FIX: Only allow the curtain to close if the scroll gesture 
        // ACTUALLY STARTED at the top. If they scrolled up from the bottom, 
        // they just hit the ceiling and must pause before trying again!
        if (scrollStartTop.current <= 2) {
          wheelAccumulator.current = 0;
          onDismiss();
        }
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
      // ✨ Record where the finger was when it first touched the screen
      scrollStartTop.current = scrollContainerRef.current?.scrollTop ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating) return;
      
      const deltaY = touchStartY.current - e.touches[0].clientY;
      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      const isSwipingUpToDown = deltaY < 0; 

      // Prevent native touch bounce immediately on bounds
      if (!isVisible) {
        e.preventDefault();
      } else if (isVisible && scrollTop <= 2 && isSwipingUpToDown) { 
        e.preventDefault();
      }

      if (!isVisible && deltaY > touchThreshold) {
        onReveal();
        return;
      }

      if (isVisible && scrollTop <= 2 && deltaY < -touchThreshold) {
        // ✨ THE FIX: Apply the exact same protection for mobile swipes
        if (scrollStartTop.current <= 2) {
          onDismiss();
        }
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