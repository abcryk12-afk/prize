import { cn } from "@/lib/cn";

export const ProgressBar = ({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) => {
  const safeMax = max <= 0 ? 1 : max;
  const pct = Math.max(0, Math.min(100, (value / safeMax) * 100));

  return (
    <div className={cn("h-2 w-full rounded-full bg-muted overflow-hidden", className)}>
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(212,175,55,0.65))] transition-[width] duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};
