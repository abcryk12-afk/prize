import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:brightness-110 active:translate-y-px",
  secondary:
    "bg-card text-foreground border border-border hover:bg-card-2 hover:border-[rgba(212,175,55,0.35)]",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-muted",
};

export const Button = ({
  children,
  className,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled,
}: Props) => {
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
