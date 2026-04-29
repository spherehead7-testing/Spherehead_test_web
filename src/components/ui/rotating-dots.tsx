interface RotatingDotsProps {
  variant?: "light" | "dark";
}

/**
 * RotatingDots component
 * Default variant is "dark".
 *
 * Use:
 * - "dark" → for dark backgrounds (default)
 * - "light" → for light backgrounds
 */
export default function RotatingDots({ variant = "dark" }: RotatingDotsProps) {
  const dot2Color = "bg-[#92D9FF]";
  const dot3Color = "bg-[#FD7624]";
  const dot1Color = variant === "dark" ? "bg-[#FFFFFF]" : "bg-[#0D54CA]";

  return (
    <div 
      className="relative w-7 h-7 shrink-0 animate-[spin_6s_linear_infinite]"
    >
      {/* Dot 1 (Top) */}
      <div className="absolute inset-0 flex justify-center items-start">
        <span className={`w-2.5 h-2.5 rounded-full ${dot1Color}`} />
      </div>

      {/* Dot 2 (Bottom Right) */}
      {/* Replaced inline style with Tailwind's rotate-[120deg] */}
      <div className="absolute inset-0 flex justify-center items-start rotate-[120deg]">
        <span className={`w-2.5 h-2.5 rounded-full ${dot2Color}`} />
      </div>

      {/* Dot 3 (Bottom Left) */}
      {/* Replaced inline style with Tailwind's rotate-[240deg] */}
      <div className="absolute inset-0 flex justify-center items-start rotate-[240deg]">
        <span className={`w-2.5 h-2.5 rounded-full ${dot3Color}`} />
      </div>
    </div>
  );
}