"use client";

import React from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";
import { pickLang, useLang } from "@/lib/lang";

type Slide = {
  id: string;
  titleEn: string;
  titleUr: string;
  descEn: string;
  descUr: string;
  ctaEn: string;
  ctaUr: string;
  href: string;
  gradient: string;
};

const slides: Slide[] = [
  {
    id: "s1",
    titleEn: "Premium Prize Competitions",
    titleUr: "پریمیم پرائز کمپٹیشنز",
    descEn: "Wallet-based entries. Verified draws. Fast payouts in Pakistan.",
    descUr: "والٹ کے ذریعے انٹری۔ ویریفائیڈ قرعہ اندازی۔ پاکستان میں تیز ادائیگیاں۔",
    ctaEn: "Browse Live Competitions",
    ctaUr: "لائیو کمپٹیشنز دیکھیں",
    href: "#live",
    gradient:
      "bg-[radial-gradient(60%_60%_at_20%_20%,rgba(212,175,55,0.22),transparent_60%),radial-gradient(60%_60%_at_80%_30%,rgba(110,168,255,0.18),transparent_60%)]",
  },
  {
    id: "s2",
    titleEn: "Deposit via Easypaisa / JazzCash",
    titleUr: "ایزی پیسہ / جاز کیش کے ذریعے ڈپازٹ",
    descEn: "Top up instantly and buy tickets from your wallet—no hassle.",
    descUr: "فوری ٹاپ اپ کریں اور والٹ سے ٹکٹ خریدیں—بغیر جھنجھٹ۔",
    ctaEn: "Open Wallet",
    ctaUr: "والٹ کھولیں",
    href: "/dashboard",
    gradient:
      "bg-[radial-gradient(70%_70%_at_15%_25%,rgba(46,229,157,0.16),transparent_60%),radial-gradient(60%_60%_at_80%_40%,rgba(212,175,55,0.18),transparent_60%)]",
  },
  {
    id: "s3",
    titleEn: "Transparent, Admin-Controlled Draws",
    titleUr: "شفاف، ایڈمن کنٹرولڈ ڈراز",
    descEn: "Competitions close on time. Winners announced with trust-first proof.",
    descUr: "کمپٹیشن وقت پر بند ہوتی ہے۔ ونرز اعتماد کے ساتھ اعلان کیے جاتے ہیں۔",
    ctaEn: "See Winners",
    ctaUr: "ونرز دیکھیں",
    href: "/winners",
    gradient:
      "bg-[radial-gradient(65%_65%_at_25%_25%,rgba(212,175,55,0.2),transparent_60%),radial-gradient(60%_60%_at_75%_45%,rgba(255,255,255,0.10),transparent_60%)]",
  },
];

export const HeroSlider = () => {
  const { lang } = useLang();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => window.clearInterval(t);
  }, []);

  const slide = slides[index] ?? slides[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
      <div className={cn("absolute inset-0", slide.gradient)} />
      <div className="relative p-6 sm:p-10">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {lang === "ur" ? "پاکستان کے لیے" : "Built for Pakistan"}
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
              {pickLang(lang, slide.titleEn, slide.titleUr)}
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {pickLang(lang, slide.descEn, slide.descUr)}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={slide.href}>{pickLang(lang, slide.ctaEn, slide.ctaUr)}</Button>
            <Button href="/how-it-works" variant="secondary">
              {lang === "ur" ? "یہ کیسے کام کرتا ہے" : "How It Works"}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-all",
                  i === index ? "bg-accent" : "bg-border hover:bg-muted-foreground/40"
                )}
                aria-label={s.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
