"use client";

import React from "react";
import type { Competition } from "@/lib/mock";
import { Container } from "@/components/Container";
import { HeroSlider } from "@/components/HeroSlider";
import { CompetitionGrid } from "@/components/CompetitionGrid";
import { pickLang, useLang } from "@/lib/lang";
import { formatCompact } from "@/lib/format";

export const HomeClient = ({ initialCompetitions }: { initialCompetitions: Competition[] }) => {
  const { lang } = useLang();

  const totalValue = initialCompetitions.reduce((sum, c) => sum + c.prizeValuePKR, 0);
  const totalSold = initialCompetitions.reduce((sum, c) => sum + c.ticketsSold, 0);

  return (
    <>
      <Container className="pt-6 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <HeroSlider />

          <div className="grid gap-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="text-sm font-bold">
                {lang === "ur" ? "لائیو میٹرکس" : "Live metrics"}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <div className="text-xs text-muted-foreground">
                    {lang === "ur" ? "کل کمپٹیشنز" : "Competitions"}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">
                    {initialCompetitions.length}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <div className="text-xs text-muted-foreground">
                    {lang === "ur" ? "لائیو ٹکٹ سیلز" : "Tickets sold"}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">{formatCompact(totalSold)}</div>
                </div>
                <div className="col-span-2 rounded-2xl border border-border bg-muted p-4">
                  <div className="text-xs text-muted-foreground">
                    {lang === "ur" ? "کل پرائز ویلیو" : "Total prize value"}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold tracking-tight">{formatCompact(totalValue)}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {lang === "ur"
                      ? "یہ ڈیمو UI ہے — حقیقی کمپٹیشن ڈیٹا بیک اینڈ سے آئے گا"
                      : "Demo UI — connect this to your real backend later"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.10)] p-6">
              <div className="text-sm font-bold">
                {lang === "ur" ? "اعتماد پہلے" : "Trust first"}
              </div>
              <div className="mt-3 grid gap-3 text-sm text-muted-foreground">
                <div>
                  {pickLang(
                    lang,
                    "Verified admin-controlled draws and clear competition end times.",
                    "ویریفائیڈ ایڈمن کنٹرولڈ قرعہ اندازی اور واضح ختم ہونے کا وقت۔"
                  )}
                </div>
                <div>
                  {pickLang(
                    lang,
                    "Wallet-based entries with instant deposit & withdrawal UI (Easypaisa/JazzCash).",
                    "والٹ کے ذریعے انٹری، فوری ڈپازٹ اور وِڈرا UI (ایزی پیسہ/جاز کیش)۔"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pt-10" >
        <div id="live" className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === "ur" ? "لائیو کمپٹیشنز" : "Live competitions"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {lang === "ur" ? "ٹکٹ کاؤنٹر ریئل ٹائم میں اپڈیٹ ہوتا ہے" : "Ticket counters update live"}
          </p>
        </div>

        <div className="mt-6">
          <CompetitionGrid initial={initialCompetitions} />
        </div>
      </Container>

      <Container className="pt-12">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <div className="text-base font-extrabold tracking-tight">
                {lang === "ur" ? "پریمیم فِن ٹیک فیل" : "Premium fintech feel"}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {lang === "ur"
                  ? "کارڈ بیسڈ ڈیزائن، گولڈ ایکسینٹس، اور موبائل فرسٹ UX۔"
                  : "Card-based layout, gold accents, and mobile-first UX."}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-muted p-5">
              <div className="text-sm font-bold">{lang === "ur" ? "ڈپازٹ" : "Deposit"}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {lang === "ur"
                  ? "ایزی پیسہ یا جاز کیش کے ذریعے والٹ ٹاپ اپ کریں۔"
                  : "Top up your wallet via Easypaisa or JazzCash."}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-muted p-5">
              <div className="text-sm font-bold">{lang === "ur" ? "وِڈرا" : "Withdraw"}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {lang === "ur"
                  ? "جیتنے کے بعد یا بیلنس نکالنے کے لیے فوری وِڈرا۔"
                  : "Fast withdrawal for balance and prize payouts."}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
