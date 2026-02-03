"use client";

import React from "react";
import type { Competition } from "@/lib/mock";
import { api } from "@/lib/api";
import { Container } from "@/components/Container";
import { ProgressBar } from "@/components/ProgressBar";
import { Countdown } from "@/components/Countdown";
import { PrizeGallery } from "@/components/PrizeGallery";
import { BuyTicketsPanel } from "@/components/BuyTicketsPanel";
import { formatNumber, formatPKR } from "@/lib/format";
import { pickLang, useLang } from "@/lib/lang";

export const CompetitionDetailClient = ({ competition }: { competition: Competition }) => {
  const { lang } = useLang();
  const [live, setLive] = React.useState<Competition>(competition);

  const refreshLive = React.useCallback(async () => {
    try {
      const res = await api.competition(competition.id);
      setLive(res.competition);
    } catch {}
  }, [competition.id]);

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.competition(competition.id);
        if (mounted) setLive(res.competition);
      } catch {}
    };

    void load();
    const t = window.setInterval(() => void load(), 3500);
    return () => {
      mounted = false;
      window.clearInterval(t);
    };
  }, [competition.id]);

  const title = pickLang(lang, live.titleEn, live.titleUr);
  const prizeTitle = pickLang(lang, live.prizeTitleEn, live.prizeTitleUr);

  const remaining = Math.max(0, live.ticketsTotal - live.ticketsSold);

  return (
    <Container className="pt-6 sm:pt-10">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.10)] px-3 py-1 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {lang === "ur" ? "لائیو کمپٹیشن" : "Live competition"}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{prizeTitle}</h1>
            <div className="text-sm text-muted-foreground">{title}</div>
          </div>

          <PrizeGallery title={prizeTitle} images={live.images.length ? live.images : ["/prizes/placeholder.svg"]} />

          <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">{lang === "ur" ? "ختم ہونے میں" : "Time left"}</div>
                <Countdown endsAt={live.endsAt} />
              </div>
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs text-muted-foreground">{lang === "ur" ? "ٹکٹ قیمت" : "Ticket price"}</div>
                <div className="mt-1 text-xl font-extrabold tracking-tight">{formatPKR(live.ticketPricePKR)}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {lang === "ur" ? "فروخت" : "Sold"}: <span className="text-foreground font-semibold">{formatNumber(live.ticketsSold)}</span>
                </span>
                <span>
                  {lang === "ur" ? "باقی" : "Remaining"}: <span className="text-foreground font-semibold">{formatNumber(remaining)}</span>
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar value={live.ticketsSold} max={live.ticketsTotal} />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs text-muted-foreground">{lang === "ur" ? "کل ٹکٹ" : "Total tickets"}</div>
                <div className="mt-1 text-lg font-extrabold">{formatNumber(live.ticketsTotal)}</div>
              </div>
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs text-muted-foreground">{lang === "ur" ? "پرائز ویلیو" : "Prize value"}</div>
                <div className="mt-1 text-lg font-extrabold">{formatPKR(live.prizeValuePKR)}</div>
              </div>
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs text-muted-foreground">{lang === "ur" ? "ڈرا" : "Draw"}</div>
                <div className="mt-1 text-sm font-semibold text-muted-foreground">
                  {lang === "ur" ? "ایڈمن کنٹرولڈ" : "Admin controlled"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <div className="text-sm font-bold">{lang === "ur" ? "اہم معلومات" : "Important"}</div>
            <div className="mt-2 grid gap-2 text-sm text-muted-foreground">
              <div>
                {pickLang(
                  lang,
                  "Your entries are stored in your dashboard. Draws are executed by admins when the competition ends.",
                  "آپ کی انٹریز ڈیش بورڈ میں محفوظ ہوتی ہیں۔ کمپٹیشن ختم ہونے پر ڈرا ایڈمن کرتا ہے۔"
                )}
              </div>
              <div>
                {pickLang(
                  lang,
                  "This is a demo build—connect real authentication and payments on the server.",
                  "یہ ڈیمو ہے—حقیقی لاگ اِن اور پیمنٹس سرور پر شامل کریں۔"
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <BuyTicketsPanel competition={live} onPurchased={refreshLive} />

          <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <div className="text-sm font-bold">{lang === "ur" ? "پیمنٹ میتھڈز" : "Payment methods"}</div>
            <div className="mt-3 grid gap-3">
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-sm font-semibold">Easypaisa</div>
                <div className="text-xs text-muted-foreground">
                  {lang === "ur" ? "فوری ٹاپ اپ اور وِڈرا" : "Instant top-up & withdraw"}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-sm font-semibold">JazzCash</div>
                <div className="text-xs text-muted-foreground">
                  {lang === "ur" ? "پاکستان میں آسان ادائیگی" : "Convenient PK payments"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
