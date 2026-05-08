import { cn } from "@/lib/utils";

type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SiteContainer({
  children,
  className,
}: SiteContainerProps) {
  return (
    <div
      className={cn(
      
        "mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}