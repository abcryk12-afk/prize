"use client";

import React from "react";
import type { Winner } from "@/lib/mock";
import { api } from "@/lib/api";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { pickLang, useLang } from "@/lib/lang";

export const WinnersClient = ({ initial }: { initial: Winner[] }) => {
  const { lang } = useLang();
  const [winners, setWinners] = React.useState<Winner[]>(initial);

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.winners();
        if (mounted) setWinners(res.winners);
      } catch {}
    };

    const t = window.setInterval(() => void load(), 8000);
    return () => {
      mounted = false;
      window.clearInterval(t);
    };
  }, []);

  return (
    <Container className="pt-6 sm:pt-10">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.10)] px-3 py-1 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {lang === "ur" ? "اعتماد پہلے" : "Trust first"}
        </div>
        <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight">
          {lang === "ur" ? "ہمارے ونرز" : "Recent winners"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
          {pickLang(
            lang,
            "We announce winners with a trust-focused layout. In production, you can attach draw proofs, IDs, and verification media.",
            "ہم ونرز کو اعتماد کے ساتھ دکھاتے ہیں۔ پروڈکشن میں ڈرا پروف، آئی ڈی اور ویریفیکیشن میڈیا شامل کریں۔"
          )}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/how-it-works" variant="secondary">
            {lang === "ur" ? "یہ کیسے کام کرتا ہے" : "How it works"}
          </Button>
          <Button href="/#live" variant="ghost">
            {lang === "ur" ? "لائیو کمپٹیشنز" : "Live competitions"}
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {winners.map((w) => (
          <div key={w.id} className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-extrabold tracking-tight">{w.winnerName}</div>
                <div className="mt-1 text-sm text-muted-foreground">{w.city}, Pakistan</div>
              </div>
              <div className="rounded-full border border-[rgba(46,229,157,0.35)] bg-[rgba(46,229,157,0.10)] px-3 py-1 text-xs font-semibold">
                {lang === "ur" ? "ویریفائیڈ" : "VERIFIED"}
              </div>
            </div>

            <div className="mt-5 grid gap-2 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{lang === "ur" ? "کمپٹیشن" : "Competition"}</span>
                <span className="text-foreground font-semibold">{w.competitionId}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{lang === "ur" ? "تاریخ" : "Date"}</span>
                <span className="text-foreground font-semibold">{new Date(w.wonAt).toLocaleDateString("en-PK")}</span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-muted p-4 text-xs text-muted-foreground">
              {pickLang(
                lang,
                "In production: show draw video, random seed/hash, and winner confirmation.",
                "پروڈکشن میں: ڈرا ویڈیو، سیڈ/ہیش، اور ونر کنفرمیشن دکھائیں۔"
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div className="text-base font-extrabold tracking-tight">
          {lang === "ur" ? "ہم اعتماد کیسے بناتے ہیں" : "How we build trust"}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-sm font-bold">{lang === "ur" ? "واضح ٹائمر" : "Clear timers"}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {lang === "ur" ? "ہر کمپٹیشن کا ختم ہونے کا وقت واضح۔" : "Each competition has a clear end time."}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-sm font-bold">{lang === "ur" ? "ایڈمن کنٹرولڈ ڈرا" : "Admin-controlled draw"}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {lang === "ur" ? "ڈرا بند ہونے کے بعد کیا جاتا ہے۔" : "Draw is executed after competition closes."}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-sm font-bold">{lang === "ur" ? "ریکارڈ" : "Audit trail"}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {lang === "ur" ? "ٹرانزیکشن اور انٹری ہسٹری۔" : "Transaction and entry history."}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
