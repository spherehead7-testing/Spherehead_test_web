import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  animated?: boolean;
};

type LinkProps = BaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

type ButtonProps = BaseProps & {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type GradientButtonProps = LinkProps | ButtonProps;

const baseClassName =
  "body-medium rounded bg-animated-gradient px-6 py-2 text-white";

function content(children: ReactNode, animated?: boolean) {
  if (!animated) return children;

  return (
    <>
      <span className="invisible">{children}</span>
      <span className="absolute top-0 left-0 flex h-[200%] w-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] lg:group-hover:-translate-y-1/2">
        <span className="body-medium flex h-1/2 w-full items-center justify-center">
          {children}
        </span>
        <span className="body-medium flex h-1/2 w-full items-center justify-center">
          {children}
        </span>
      </span>
    </>
  );
}

export default function GradientButton(props: GradientButtonProps) {
  const { children, className, animated = false } = props;
  const composedClassName = cn(
    baseClassName,
    animated &&
      "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden",
    className,
  );

  if ("href" in props && props.href) {
    const {
      href,
      children: _children,
      className: _className,
      animated: _animated,
      ...linkProps
    } = props;
    return (
      <Link href={href} className={composedClassName} {...linkProps}>
        {content(children, animated)}
      </Link>
    );
  }

  const {
    children: _children,
    className: _className,
    animated: _animated,
    ...buttonProps
  } = props as ButtonProps;

  return (
    <button className={composedClassName} {...buttonProps}>
      {content(children, animated)}
    </button>
  );
}
