import type React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Competition } from "@/lib/mock";
import { formatCompact, formatPKR, formatNumber } from "@/lib/format";
import { pickLang, type Lang } from "@/lib/lang";
import { ProgressBar } from "@/components/ProgressBar";
import { Countdown } from "@/components/Countdown";

export const CompetitionCard = ({
  competition,
  lang,
}: {
  competition: Competition;
  lang: Lang;
}) => {
  const remaining = Math.max(0, competition.ticketsTotal - competition.ticketsSold);
  const title = pickLang(lang, competition.titleEn, competition.titleUr);
  const prizeTitle = pickLang(lang, competition.prizeTitleEn, competition.prizeTitleUr);

  return (
    <Link
      href={`/competition/${competition.id}`}
      className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:bg-card-2 hover:-translate-y-0.5"
    >
      <div className="relative aspect-16/10">
        <Image
          src={competition.images[0] ?? "/prizes/placeholder.svg"}
          alt={title}
          fill
          className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.03]"
          unoptimized
          priority={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,18,37,0.86))]" />
        <div className="absolute left-4 right-4 bottom-4">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.10)] px-3 py-1 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {lang === "ur" ? "لائیو" : "LIVE"}
            </div>
            <div className="text-xs text-muted-foreground">
              {lang === "ur" ? "ختم ہونے میں" : "Ends in"}: <Countdown endsAt={competition.endsAt} compact />
            </div>
          </div>
          <div className="mt-3 text-lg font-extrabold tracking-tight text-foreground">{prizeTitle}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-muted-foreground">{lang === "ur" ? "ٹکٹ" : "Ticket"}</div>
            <div className="text-base font-bold">{formatPKR(competition.ticketPricePKR)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">{lang === "ur" ? "پرائز ویلیو" : "Prize value"}</div>
            <div className="text-base font-bold">{formatCompact(competition.prizeValuePKR)}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {lang === "ur" ? "فروخت" : "Sold"}: <span className="text-foreground font-semibold">{formatNumber(competition.ticketsSold)}</span>
            </span>
            <span>
              {lang === "ur" ? "باقی" : "Remaining"}: <span className="text-foreground font-semibold">{formatNumber(remaining)}</span>
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar value={competition.ticketsSold} max={competition.ticketsTotal} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            {lang === "ur" ? "کل ٹکٹ" : "Total"}: <span className="text-foreground font-semibold">{formatNumber(competition.ticketsTotal)}</span>
          </div>
          <div className="rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold">
            {lang === "ur" ? "اب انٹری کریں" : "Enter now"}
          </div>
        </div>
      </div>
    </Link>
  );
};
