"use client";

import React from "react";
import type { Competition, Winner } from "@/lib/mock";
import { api } from "@/lib/api";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { pickLang, useLang } from "@/lib/lang";

export const AdminClient = ({
  initial,
}: {
  initial: { competitions: Competition[]; winners: Winner[] };
}) => {
  const { lang } = useLang();

  const [competitions, setCompetitions] = React.useState(initial.competitions);
  const [winners, setWinners] = React.useState(initial.winners);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    const [c, w] = await Promise.all([api.competitions(), api.winners()]);
    setCompetitions(c.competitions);
    setWinners(w.winners);
  }, []);

  const runDraw = async (competitionId: string) => {
    setLoadingId(competitionId);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/draw", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ competitionId }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Draw failed");
      }

      setMessage(lang === "ur" ? "ڈرا مکمل ہوگیا" : "Draw completed");
      await refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Draw failed";
      setError(msg);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Container className="pt-6 sm:pt-10">
      <div className="rounded-3xl border border-[rgba(255,77,77,0.35)] bg-[rgba(255,77,77,0.08)] p-5 sm:p-6">
        <div className="text-sm font-extrabold tracking-tight">{lang === "ur" ? "ایڈمن ڈیمو" : "Admin demo"}</div>
        <div className="mt-2 text-sm text-muted-foreground">
          {pickLang(
            lang,
            "This page is a prototype control panel to trigger admin-controlled draws (for demo only).",
            "یہ صرف ڈیمو کے لیے ایڈمن کنٹرول پینل ہے — حقیقی سیکیورٹی ضروری ہے۔"
          )}
        </div>
      </div>

      {message ? (
        <div className="mt-5 rounded-3xl border border-[rgba(46,229,157,0.35)] bg-[rgba(46,229,157,0.10)] p-4 text-sm">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mt-5 rounded-3xl border border-[rgba(255,77,77,0.35)] bg-[rgba(255,77,77,0.08)] p-4 text-sm">
          {error}
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold">{lang === "ur" ? "کمپٹیشنز" : "Competitions"}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {lang === "ur" ? "ایک کلک سے ڈرا کریں" : "Trigger a draw with one click"}
              </div>
            </div>
            <Button variant="secondary" onClick={() => void refresh()}>
              {lang === "ur" ? "ریفریش" : "Refresh"}
            </Button>
          </div>

          <div className="mt-5 grid gap-3">
            {competitions.map((c) => {
              const soldPct = Math.round((c.ticketsSold / Math.max(1, c.ticketsTotal)) * 100);
              return (
                <div key={c.id} className="rounded-2xl border border-border bg-muted p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">
                        {pickLang(lang, c.prizeTitleEn, c.prizeTitleUr)}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        ID: {c.id} • {lang === "ur" ? "فروخت" : "Sold"}: {formatNumber(c.ticketsSold)} ({soldPct}%)
                      </div>
                    </div>
                    <div
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        c.status === "ended"
                          ? "border-border bg-card text-muted-foreground"
                          : "border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.10)]"
                      )}
                    >
                      {c.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-muted-foreground">
                      {lang === "ur" ? "ختم ہونے کا وقت" : "Ends"}: {new Date(c.endsAt).toLocaleString("en-PK")}
                    </div>
                    <Button
                      onClick={() => void runDraw(c.id)}
                      disabled={loadingId === c.id || c.status === "ended"}
                      className="w-full sm:w-auto"
                    >
                      {pickLang(
                        lang,
                        loadingId === c.id ? "Running…" : "Run draw",
                        loadingId === c.id ? "چل رہا ہے…" : "ڈرا کریں"
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-sm font-bold">{lang === "ur" ? "ونرز" : "Winners"}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {lang === "ur" ? "ڈرا کے بعد فوری اپڈیٹ" : "Updates after a draw"}
          </div>

          <div className="mt-5 grid gap-3">
            {winners.slice(0, 6).map((w) => (
              <div key={w.id} className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-sm font-semibold">{w.winnerName}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {w.city} • {new Date(w.wonAt).toLocaleDateString("en-PK")}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {lang === "ur" ? "کمپٹیشن" : "Competition"}: <span className="text-foreground font-semibold">{w.competitionId}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button href="/winners" variant="secondary" className="w-full">
              {lang === "ur" ? "ونرز پیج" : "Open winners page"}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
