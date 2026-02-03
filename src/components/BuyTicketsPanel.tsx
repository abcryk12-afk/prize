"use client";

import React from "react";
import type { Competition } from "@/lib/mock";
import { Button } from "@/components/Button";
import { api } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import { pickLang, useLang } from "@/lib/lang";

export const BuyTicketsPanel = ({
  competition,
  onPurchased,
}: {
  competition: Competition;
  onPurchased?: () => void;
}) => {
  const { lang } = useLang();
  const [qty, setQty] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [wallet, setWallet] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const total = competition.ticketPricePKR * qty;

  const refreshWallet = React.useCallback(async () => {
    try {
      const w = await api.wallet();
      setWallet(w.balancePKR);
    } catch {
      setWallet(null);
    }
  }, []);

  React.useEffect(() => {
    void refreshWallet();
  }, [refreshWallet]);

  const buy = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await api.purchase(competition.id, qty);
      setMessage(lang === "ur" ? "ٹکٹ کامیابی سے خرید لیے گئے" : "Tickets purchased successfully");
      await refreshWallet();
      onPurchased?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Purchase failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold">
            {lang === "ur" ? "ٹکٹ خریدیں" : "Buy tickets"}
          </div>
          <div className="text-xs text-muted-foreground">
            {lang === "ur"
              ? "ادائیگی آپ کے والٹ سے ہوگی"
              : "Payment will be deducted from your wallet"}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold">
          {lang === "ur" ? "والٹ" : "Wallet"}: {wallet === null ? "—" : formatPKR(wallet)}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <label className="text-xs text-muted-foreground">{lang === "ur" ? "تعداد" : "Quantity"}</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-11 w-11 rounded-xl border border-border bg-card hover:bg-card-2 transition-colors"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease"
          >
            −
          </button>
          <input
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
            inputMode="numeric"
            className="h-11 w-full rounded-xl border border-border bg-[rgba(0,0,0,0.12)] px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            className="h-11 w-11 rounded-xl border border-border bg-card hover:bg-card-2 transition-colors"
            onClick={() => setQty((q) => Math.min(100, q + 1))}
            aria-label="Increase"
          >
            +
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <div className="text-muted-foreground">{lang === "ur" ? "کل" : "Total"}</div>
          <div className="font-extrabold tracking-tight">{formatPKR(total)}</div>
        </div>

        {message ? (
          <div className="rounded-2xl border border-[rgba(46,229,157,0.35)] bg-[rgba(46,229,157,0.10)] p-3 text-sm">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-[rgba(255,77,77,0.35)] bg-[rgba(255,77,77,0.08)] p-3 text-sm">
            {error}
          </div>
        ) : null}

        <Button onClick={buy} disabled={loading}>
          {pickLang(lang, loading ? "Processing…" : "Buy from wallet", loading ? "پروسیسنگ…" : "والٹ سے خریدیں")}
        </Button>

        <div className="text-xs text-muted-foreground">
          {lang === "ur"
            ? "ڈپازٹ / وِڈرا کے لیے ڈیش بورڈ کھولیں"
            : "For deposit/withdraw, open your dashboard"}
        </div>
        <Button href="/dashboard" variant="secondary">
          {lang === "ur" ? "ڈیش بورڈ" : "Dashboard"}
        </Button>
      </div>
    </div>
  );
};
