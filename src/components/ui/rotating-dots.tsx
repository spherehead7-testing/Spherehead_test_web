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
        <div className="relative w-8 h-8 shrink-0 animate-[spin_6s_linear_infinite]">
            {/* Dot 1 */}
            <div className="absolute inset-0 flex justify-center">
                <span
                    className={`w-4 h-4 rounded-full ${dot1Color} -translate-y-1`}
                />
            </div>

            {/* Dot 2 */}
            <div className="absolute inset-0 flex justify-center rotate-[120deg]">
                <span
                    className={`w-4 h-4 rounded-full ${dot2Color} -translate-y-1`}
                />
            </div>

            {/* Dot 3 */}
            <div className="absolute inset-0 flex justify-center rotate-[240deg]">
                <span
                    className={`w-4 h-4 rounded-full ${dot3Color} -translate-y-1`}
                />
            </div>
        </div>
    );
}