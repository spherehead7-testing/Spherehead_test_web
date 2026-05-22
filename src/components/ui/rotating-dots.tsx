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
        <div className="relative h-5 w-5 shrink-0 animate-[spin_6s_linear_infinite] md:h-8 md:w-8">
            {/* Dot 1 */}
            <div className="absolute inset-0 flex justify-center">
                <span
                    className={`h-2.5 w-2.5 rounded-full ${dot1Color} -translate-y-0.5 md:h-4 md:w-4 md:-translate-y-1`}
                />
            </div>

            {/* Dot 2 */}
            <div className="absolute inset-0 flex justify-center rotate-[120deg]">
                <span
                    className={`h-2.5 w-2.5 rounded-full ${dot2Color} -translate-y-0.5 md:h-4 md:w-4 md:-translate-y-1`}
                />
            </div>

            {/* Dot 3 */}
            <div className="absolute inset-0 flex justify-center rotate-[240deg]">
                <span
                    className={`h-2.5 w-2.5 rounded-full ${dot3Color} -translate-y-0.5 md:h-4 md:w-4 md:-translate-y-1`}
                />
            </div>
        </div>
    );
}