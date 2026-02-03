"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { pickLang, useLang } from "@/lib/lang";

export const HowItWorksClient = () => {
  const { lang } = useLang();

  return (
    <Container className="pt-6 sm:pt-10">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {lang === "ur" ? "یہ کیسے کام کرتا ہے" : "How it works"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
          {pickLang(
            lang,
            "A premium raffle flow designed for Pakistan: deposit to wallet, buy tickets, and join verified draws.",
            "پاکستان کے لیے پریمیم فلو: والٹ میں ڈپازٹ کریں، ٹکٹ خریدیں، اور ویریفائیڈ ڈراز میں شامل ہوں۔"
          )}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/#live">{lang === "ur" ? "لائیو کمپٹیشنز" : "Browse live competitions"}</Button>
          <Button href="/dashboard" variant="secondary">
            {lang === "ur" ? "میرا والٹ" : "Open wallet"}
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">01</div>
          <div className="mt-2 text-lg font-extrabold tracking-tight">
            {lang === "ur" ? "والٹ ٹاپ اپ" : "Top up your wallet"}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {lang === "ur"
              ? "ایزی پیسہ یا جاز کیش سے ڈپازٹ کریں۔"
              : "Deposit with Easypaisa or JazzCash."}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">02</div>
          <div className="mt-2 text-lg font-extrabold tracking-tight">
            {lang === "ur" ? "کمپٹیشن منتخب کریں" : "Choose a competition"}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {lang === "ur"
              ? "ہر کمپٹیشن میں ٹکٹ کاؤنٹر اور پروگریس بار دیکھیں۔"
              : "See live counters and progress bars before entering."}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">03</div>
          <div className="mt-2 text-lg font-extrabold tracking-tight">
            {lang === "ur" ? "والٹ سے ٹکٹ خریدیں" : "Buy tickets from wallet"}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {lang === "ur" ? "ادائیگی فوراً والٹ سے کٹ جاتی ہے۔" : "Funds are deducted instantly from your wallet."}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">04</div>
          <div className="mt-2 text-lg font-extrabold tracking-tight">
            {lang === "ur" ? "ایڈمن ڈرا" : "Admin draw"}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {lang === "ur"
              ? "کمپٹیشن بند ہونے کے بعد ایڈمن قرعہ اندازی کرتا ہے۔"
              : "Once a competition ends, admins run the draw."}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">05</div>
          <div className="mt-2 text-lg font-extrabold tracking-tight">
            {lang === "ur" ? "ونر اعلان" : "Winner announcement"}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {lang === "ur"
              ? "ونرز پیج پر اعتماد کے ساتھ اعلان کیا جاتا ہے۔"
              : "Winners are listed with a trust-focused layout."}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">06</div>
          <div className="mt-2 text-lg font-extrabold tracking-tight">
            {lang === "ur" ? "پے آؤٹ / وِڈرا" : "Payout / withdraw"}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {lang === "ur" ? "بیلنس وِڈرا کریں یا انعام پے آؤٹ لیں۔" : "Withdraw balance or receive prize payout."}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div className="text-base font-extrabold tracking-tight">
          {lang === "ur" ? "FAQ" : "FAQ"}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-sm font-bold">
              {lang === "ur" ? "کیا یہ حقیقی پیمنٹ ہے؟" : "Are payments real?"}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {pickLang(
                lang,
                "This build is UI + mock API. Integrate real Easypaisa/JazzCash on the server for production.",
                "یہ UI + ڈیمو API ہے۔ پروڈکشن کے لیے حقیقی ایزی پیسہ/جاز کیش سرور پر شامل کریں۔"
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-sm font-bold">{lang === "ur" ? "ٹکٹس کہاں دیکھوں؟" : "Where do I see my tickets?"}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {lang === "ur" ? "ڈیش بورڈ میں ‘میرے ٹکٹس’ سیکشن دیکھیں۔" : "Check the Dashboard → My tickets section."}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-sm font-bold">{lang === "ur" ? "ونر کیسے منتخب ہوتا ہے؟" : "How is the winner selected?"}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {pickLang(
                lang,
                "Admins execute the draw. In production you should provide proof (video, seed/hash, audit logs).",
                "ایڈمن ڈرا کرتا ہے۔ پروڈکشن میں پروف (ویڈیو، سیڈ/ہیش، آڈٹ لاگز) دیں۔"
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-sm font-bold">{lang === "ur" ? "کیا UI موبائل فرسٹ ہے؟" : "Is the UI mobile-first?"}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {lang === "ur" ? "جی، تمام صفحات موبائل پر بہترین نظر آئیں گے۔" : "Yes—layouts are built mobile-first and scale up."}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
