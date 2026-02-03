"use client";

import React from "react";

const two = (n: number) => String(n).padStart(2, "0");

const diffParts = (endsAt: string) => {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: diff === 0 };
};

export const Countdown = ({
  endsAt,
  compact,
}: {
  endsAt: string;
  compact?: boolean;
}) => {
  const [parts, setParts] = React.useState(() => diffParts(endsAt));

  React.useEffect(() => {
    const t = window.setInterval(() => setParts(diffParts(endsAt)), 1000);
    return () => window.clearInterval(t);
  }, [endsAt]);

  if (compact) {
    if (parts.done) return <span className="text-danger">Ended</span>;
    if (parts.days > 0) return <span>{parts.days}d {two(parts.hours)}h</span>;
    return (
      <span>
        {two(parts.hours)}:{two(parts.minutes)}:{two(parts.seconds)}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg border border-border bg-card px-3 py-2">
        <div className="text-xs text-muted-foreground">Days</div>
        <div className="text-lg font-bold tabular-nums">{parts.days}</div>
      </div>
      <div className="rounded-lg border border-border bg-card px-3 py-2">
        <div className="text-xs text-muted-foreground">Hours</div>
        <div className="text-lg font-bold tabular-nums">{two(parts.hours)}</div>
      </div>
      <div className="rounded-lg border border-border bg-card px-3 py-2">
        <div className="text-xs text-muted-foreground">Mins</div>
        <div className="text-lg font-bold tabular-nums">{two(parts.minutes)}</div>
      </div>
      <div className="rounded-lg border border-border bg-card px-3 py-2">
        <div className="text-xs text-muted-foreground">Secs</div>
        <div className="text-lg font-bold tabular-nums">{two(parts.seconds)}</div>
      </div>
    </div>
  );
};
