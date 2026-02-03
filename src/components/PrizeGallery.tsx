"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export const PrizeGallery = ({
  title,
  images,
}: {
  title: string;
  images: string[];
}) => {
  const [active, setActive] = React.useState(0);
  const src = images[active] ?? "/prizes/placeholder.svg";

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div className="relative aspect-16/11">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,18,37,0.55))]" />
        </div>
      </div>

      <div className="flex gap-2 overflow-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-24 flex-none overflow-hidden rounded-2xl border transition-all",
              i === active ? "border-[rgba(212,175,55,0.55)]" : "border-border hover:border-[rgba(212,175,55,0.35)]"
            )}
            aria-label={String(i)}
          >
            <Image src={img} alt={title} fill className="object-cover" unoptimized />
          </button>
        ))}
      </div>
    </div>
  );
};
