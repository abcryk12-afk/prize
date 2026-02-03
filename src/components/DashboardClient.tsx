"use client";

import React from "react";
import type { Competition, PaymentMethod, TicketPurchase, Transaction } from "@/lib/mock";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { formatNumber, formatPKR } from "@/lib/format";
import { pickLang, useLang } from "@/lib/lang";

type Initial = {
  wallet: { balancePKR: number };
  competitions: Competition[];
  tickets: TicketPurchase[];
  transactions: Transaction[];
};

const methodLabel = (m: PaymentMethod) => (m === "easypaisa" ? "Easypaisa" : "JazzCash");

const typeLabel = (lang: "en" | "ur", t: Transaction["type"]) => {
  if (t === "deposit") return lang === "ur" ? "ڈپازٹ" : "Deposit";
  if (t === "withdraw") return lang === "ur" ? "وِڈرا" : "Withdraw";
  return lang === "ur" ? "پرچیز" : "Purchase";
};

export const DashboardClient = ({ initial }: { initial: Initial }) => {
  const { lang } = useLang();

  const [wallet, setWallet] = React.useState(initial.wallet.balancePKR);
  const [tickets, setTickets] = React.useState<TicketPurchase[]>(initial.tickets);
  const [transactions, setTransactions] = React.useState<Transaction[]>(initial.transactions);

  const [depositMethod, setDepositMethod] = React.useState<PaymentMethod>("easypaisa");
  const [depositAmount, setDepositAmount] = React.useState<number>(1000);
  const [depositLoading, setDepositLoading] = React.useState(false);

  const [withdrawMethod, setWithdrawMethod] = React.useState<PaymentMethod>("jazzcash");
  const [withdrawAmount, setWithdrawAmount] = React.useState<number>(500);
  const [withdrawLoading, setWithdrawLoading] = React.useState(false);

  const [notice, setNotice] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const competitionById = React.useMemo(() => {
    const map = new Map<string, Competition>();
    for (const c of initial.competitions) map.set(c.id, c);
    return map;
  }, [initial.competitions]);

  const refresh = React.useCallback(async () => {
    const [w, t, tx] = await Promise.all([api.wallet(), api.tickets(), api.transactions()]);
    setWallet(w.balancePKR);
    setTickets(t.tickets);
    setTransactions(tx.transactions);
  }, []);

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        await refresh();
      } catch {
        if (!mounted) return;
      }
    };

    const t = window.setInterval(() => void load(), 9000);
    return () => {
      mounted = false;
      window.clearInterval(t);
    };
  }, [refresh]);

  const doDeposit = async () => {
    setDepositLoading(true);
    setError(null);
    setNotice(null);

    try {
      await api.deposit(depositMethod, depositAmount);
      await refresh();
      setNotice(lang === "ur" ? "ڈپازٹ کامیاب" : "Deposit successful");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Deposit failed";
      setError(msg);
    } finally {
      setDepositLoading(false);
    }
  };

  const doWithdraw = async () => {
    setWithdrawLoading(true);
    setError(null);
    setNotice(null);

    try {
      await api.withdraw(withdrawMethod, withdrawAmount);
      await refresh();
      setNotice(lang === "ur" ? "وِڈرا کامیاب" : "Withdraw successful");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Withdraw failed";
      setError(msg);
    } finally {
      setWithdrawLoading(false);
    }
  };

  const totalSpent = transactions
    .filter((t) => t.type === "purchase")
    .reduce((sum, t) => sum + t.amountPKR, 0);

  return (
    <Container className="pt-6 sm:pt-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {lang === "ur" ? "یوزر ڈیش بورڈ" : "User dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {lang === "ur"
            ? "والٹ، ڈپازٹ/وِڈرا، ٹکٹس اور ٹرانزیکشنز"
            : "Wallet, deposit/withdraw, tickets and transactions"}
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-bold">{lang === "ur" ? "والٹ بیلنس" : "Wallet balance"}</div>
                <div className="mt-2 text-3xl font-extrabold tracking-tight">{formatPKR(wallet)}</div>
              </div>
              <div className="rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.10)] px-4 py-3 text-xs font-semibold">
                {lang === "ur" ? "لائیو" : "LIVE"}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs text-muted-foreground">{lang === "ur" ? "کل ٹکٹس" : "Tickets"}</div>
                <div className="mt-1 text-xl font-extrabold">{formatNumber(tickets.length)}</div>
              </div>
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs text-muted-foreground">{lang === "ur" ? "کل خرچ" : "Spent"}</div>
                <div className="mt-1 text-xl font-extrabold">{formatPKR(totalSpent)}</div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => void refresh()} variant="secondary" className="w-full sm:w-auto">
                {lang === "ur" ? "ریفریش" : "Refresh"}
              </Button>
              <Button href="/#live" variant="ghost" className="w-full sm:w-auto">
                {lang === "ur" ? "لائیو کمپٹیشنز" : "Live competitions"}
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-sm font-bold">{lang === "ur" ? "ڈپازٹ" : "Deposit"}</div>
            <div className="mt-3 grid gap-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDepositMethod("easypaisa")}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-colors",
                    depositMethod === "easypaisa"
                      ? "border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.10)]"
                      : "border-border bg-muted hover:bg-card-2"
                  )}
                >
                  <div className="text-sm font-semibold">Easypaisa</div>
                  <div className="text-xs text-muted-foreground">
                    {lang === "ur" ? "فوری ٹاپ اپ" : "Instant top-up"}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDepositMethod("jazzcash")}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-colors",
                    depositMethod === "jazzcash"
                      ? "border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.10)]"
                      : "border-border bg-muted hover:bg-card-2"
                  )}
                >
                  <div className="text-sm font-semibold">JazzCash</div>
                  <div className="text-xs text-muted-foreground">
                    {lang === "ur" ? "پاکستان میں آسان" : "Popular in PK"}
                  </div>
                </button>
              </div>

              <label className="text-xs text-muted-foreground">{lang === "ur" ? "رقم (PKR)" : "Amount (PKR)"}</label>
              <input
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value) || 0)}
                inputMode="numeric"
                className="h-11 w-full rounded-xl border border-border bg-[rgba(0,0,0,0.12)] px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
              />

              <Button onClick={doDeposit} disabled={depositLoading}>
                {pickLang(
                  lang,
                  depositLoading ? "Processing…" : `Deposit via ${methodLabel(depositMethod)}`,
                  depositLoading ? "پروسیسنگ…" : "ڈپازٹ کریں"
                )}
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-sm font-bold">{lang === "ur" ? "وِڈرا" : "Withdraw"}</div>
            <div className="mt-3 grid gap-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawMethod("easypaisa")}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-colors",
                    withdrawMethod === "easypaisa"
                      ? "border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.10)]"
                      : "border-border bg-muted hover:bg-card-2"
                  )}
                >
                  <div className="text-sm font-semibold">Easypaisa</div>
                  <div className="text-xs text-muted-foreground">
                    {lang === "ur" ? "تیز ادائیگی" : "Fast payout"}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setWithdrawMethod("jazzcash")}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-colors",
                    withdrawMethod === "jazzcash"
                      ? "border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.10)]"
                      : "border-border bg-muted hover:bg-card-2"
                  )}
                >
                  <div className="text-sm font-semibold">JazzCash</div>
                  <div className="text-xs text-muted-foreground">
                    {lang === "ur" ? "آسان وِڈرا" : "Easy withdraw"}
                  </div>
                </button>
              </div>

              <label className="text-xs text-muted-foreground">{lang === "ur" ? "رقم (PKR)" : "Amount (PKR)"}</label>
              <input
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value) || 0)}
                inputMode="numeric"
                className="h-11 w-full rounded-xl border border-border bg-[rgba(0,0,0,0.12)] px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
              />

              <Button onClick={doWithdraw} disabled={withdrawLoading}>
                {pickLang(
                  lang,
                  withdrawLoading ? "Processing…" : `Withdraw via ${methodLabel(withdrawMethod)}`,
                  withdrawLoading ? "پروسیسنگ…" : "وِڈرا کریں"
                )}
              </Button>
            </div>
          </div>

          {notice ? (
            <div className="rounded-3xl border border-[rgba(46,229,157,0.35)] bg-[rgba(46,229,157,0.10)] p-4 text-sm">
              {notice}
            </div>
          ) : null}
          {error ? (
            <div className="rounded-3xl border border-[rgba(255,77,77,0.35)] bg-[rgba(255,77,77,0.08)] p-4 text-sm">
              {error}
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-bold">{lang === "ur" ? "میرے ٹکٹس" : "My tickets"}</div>
              <div className="text-xs text-muted-foreground">
                {lang === "ur" ? "خریداری والٹ سے" : "Purchased from wallet"}
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {tickets.length === 0 ? (
                <div className="rounded-2xl border border-border bg-muted p-4 text-sm text-muted-foreground">
                  {lang === "ur" ? "ابھی تک کوئی ٹکٹ نہیں" : "No tickets yet"}
                </div>
              ) : (
                tickets.map((t) => {
                  const comp = competitionById.get(t.competitionId);
                  const compTitle = comp
                    ? pickLang(lang, comp.prizeTitleEn, comp.prizeTitleUr)
                    : t.competitionId;
                  return (
                    <div key={t.id} className="rounded-2xl border border-border bg-muted p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{compTitle}</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {lang === "ur" ? "تعداد" : "Qty"}: {t.quantity} • {lang === "ur" ? "کل" : "Total"}: {formatPKR(t.totalPKR)}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(t.purchasedAt).toLocaleString("en-PK")}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-bold">{lang === "ur" ? "ٹرانزیکشنز" : "Transactions"}</div>
              <div className="text-xs text-muted-foreground">{lang === "ur" ? "ہسٹری" : "History"}</div>
            </div>

            <div className="mt-4 grid gap-2">
              {transactions.length === 0 ? (
                <div className="rounded-2xl border border-border bg-muted p-4 text-sm text-muted-foreground">
                  {lang === "ur" ? "ابھی تک کوئی ٹرانزیکشن نہیں" : "No transactions yet"}
                </div>
              ) : (
                transactions.slice(0, 12).map((t) => (
                  <div key={t.id} className="rounded-2xl border border-border bg-muted p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">
                          {typeLabel(lang, t.type)}
                          {t.method ? <span className="text-muted-foreground"> • {methodLabel(t.method)}</span> : null}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{t.status.toUpperCase()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold tracking-tight">{formatPKR(t.amountPKR)}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {new Date(t.createdAt).toLocaleString("en-PK")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              {lang === "ur"
                ? "یہ ڈیمو ڈیش بورڈ ہے — اصل ادائیگی کے لیے سرور سائیڈ انٹیگریشن ضروری ہے۔"
                : "Demo dashboard — integrate real payments and auth on the server."}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
