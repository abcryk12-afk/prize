"use client";

import React from "react";
import type { Competition } from "@/lib/mock";
import { api } from "@/lib/api";
import { useLang } from "@/lib/lang";
import { CompetitionCard } from "@/components/CompetitionCard";

export const CompetitionGrid = ({ initial }: { initial: Competition[] }) => {
  const { lang } = useLang();
  const [competitions, setCompetitions] = React.useState<Competition[]>(initial);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.competitions();
        if (mounted) {
          setCompetitions(res.competitions);
          setError(null);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load";
        if (mounted) setError(message);
      }
    };

    const t = window.setInterval(() => void load(), 5000);
    return () => {
      mounted = false;
      window.clearInterval(t);
    };
  }, []);

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-2xl border border-[rgba(255,77,77,0.35)] bg-[rgba(255,77,77,0.08)] p-4 text-sm">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((c) => (
          <CompetitionCard key={c.id} competition={c} lang={lang} />
        ))}
      </div>
    </div>
  );
};
