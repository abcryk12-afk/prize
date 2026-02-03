"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { formatPKR } from "@/lib/format";
import { pickLang, useLang } from "@/lib/lang";

type NavItem = { href: string; labelEn: string; labelUr: string };

const nav: NavItem[] = [
  { href: "/", labelEn: "Home", labelUr: "ہوم" },
  { href: "/winners", labelEn: "Winners", labelUr: "ونرز" },
  { href: "/how-it-works", labelEn: "How it works", labelUr: "یہ کیسے کام کرتا ہے" },
  { href: "/dashboard", labelEn: "Dashboard", labelUr: "ڈیش بورڈ" },
];

export const SiteHeader = () => {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [open, setOpen] = React.useState(false);
  const [balance, setBalance] = React.useState<number | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const w = await api.wallet();
        if (mounted) setBalance(w.balancePKR);
      } catch {
        if (mounted) setBalance(null);
      }
    };

    void load();
    const t = window.setInterval(() => void load(), 12000);

    return () => {
      mounted = false;
      window.clearInterval(t);
    };
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-(--background)/70 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-card border border-border group-hover:gold-ring transition-shadow">
              <span className="text-accent font-black tracking-tight">LD</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-extrabold tracking-tight">LuckyDrew</div>
              <div className="text-xs text-muted-foreground">
                {lang === "ur" ? "پریمیم رافلز" : "Premium raffles"}
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                    active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {pickLang(lang, item.labelEn, item.labelUr)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="hidden sm:inline-flex"
              href="/dashboard"
            >
              <span className="text-xs text-muted-foreground">
                {lang === "ur" ? "والٹ" : "Wallet"}
              </span>
              <span className="font-bold">{balance === null ? "—" : formatPKR(balance)}</span>
            </Button>

            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-card-2 transition-colors"
              aria-label="Toggle language"
            >
              {lang === "en" ? "اردو" : "EN"}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-card-2 transition-colors"
              aria-label="Open menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open ? (
          <div className="md:hidden pt-4">
            <div className="rounded-2xl border border-border bg-card p-2">
              <div className="grid gap-1">
                {nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-xl px-3 py-3 text-sm font-semibold transition-colors",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {pickLang(lang, item.labelEn, item.labelUr)}
                    </Link>
                  );
                })}
                <Link
                  href="/dashboard"
                  className="rounded-xl px-3 py-3 text-sm font-semibold bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.22)]"
                >
                  {lang === "ur" ? "والٹ بیلنس" : "Wallet balance"}: {balance === null ? "—" : formatPKR(balance)}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
};
