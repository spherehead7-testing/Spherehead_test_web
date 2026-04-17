import { useEffect, useRef } from "react";

export default function useAutoScroll() {
  const isAutoScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRestingYRef = useRef(0);

  useEffect(() => {
    // Lock the initial position to an exact boundary
    lastRestingYRef.current = Math.round(window.scrollY / window.innerHeight) * window.innerHeight;

    const animateScroll = (targetY: number) => {
      if (isAutoScrollingRef.current) return;
      
      const startY = window.scrollY;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) {
        lastRestingYRef.current = targetY;
        return;
      }

      isAutoScrollingRef.current = true;
      const duration = 400; 
      const startTime = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeOut(progress));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          // Only update the resting point to exact, perfect multiples of vh
          lastRestingYRef.current = targetY; 
          setTimeout(() => { isAutoScrollingRef.current = false; }, 300);
        }
      };
      requestAnimationFrame(step);
    };

    const handleScroll = () => {
      if (isAutoScrollingRef.current) return;

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);

      scrollStopTimerRef.current = setTimeout(() => {
        const currentY = window.scrollY;
        const vh = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - vh;

        // How many strict 100vh sections exist before the List Section?
        // Hero (0), Intro (1), Approach (2) => List starts at exactly 3 * vh
        const FREE_SCROLL_START_VH = 3 * vh; 
        
        // --- RULE 1: THE FREE SCROLL ZONE ---
        // If we are deep inside the List Section / Tech Stack
        if (currentY >= FREE_SCROLL_START_VH + 5) {
            
            // CRITICAL FIX: Lock the resting Y to exactly the top of the List section.
            // This guarantees that when you scroll back UP, it calculates the distance 
            // relative to the exact 300vh boundary, not a fractional offset.
            lastRestingYRef.current = FREE_SCROLL_START_VH;
            
            // Snap to the absolute bottom of the page if they reach the footer
            if (currentY > maxScroll - (vh * 0.5)) {
                animateScroll(maxScroll);
            }
            return; 
        }

        // --- RULE 2: STRICT INDEX-BASED SNAPPING ---
        const distanceScrolled = currentY - lastRestingYRef.current;
        
        // Figure out which exact section index we are currently resting on (0, 1, 2, or 3)
        const currentIndex = Math.round(lastRestingYRef.current / vh);
        let targetIndex = currentIndex;

        // If swiped down intentionally
        if (distanceScrolled > 20) {
            targetIndex = currentIndex + 1;
        } 
        // If swiped up intentionally
        else if (distanceScrolled < -20) {
            targetIndex = currentIndex - 1;
        }

        // Never snap below section 0 or above section 3 (The List Section)
        targetIndex = Math.max(0, Math.min(targetIndex, 3));
        
        // Animate exactly to a perfect multiple of vh (0, 100vh, 200vh, or 300vh)
        animateScroll(targetIndex * vh);

      }, 60); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, []);
}