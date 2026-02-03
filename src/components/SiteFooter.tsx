import Link from "next/link";
import { Container } from "@/components/Container";

export const SiteFooter = () => {
  return (
    <footer className="mt-10 border-t border-border">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-base font-extrabold tracking-tight">LuckyDrew</div>
            <div className="text-sm text-muted-foreground">
              Premium prize competitions with wallet-based entries and trust-first winner announcements.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link className="text-muted-foreground hover:text-foreground" href="/how-it-works">
              How it works
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/winners">
              Winners
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/admin">
              Admin (demo)
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/#live">
              Live competitions
            </Link>
          </div>

          <div className="space-y-2 text-sm">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="font-semibold">Payments</div>
              <div className="text-muted-foreground mt-1">Easypaisa, JazzCash (demo UI)</div>
              <div className="mt-3 text-xs text-muted-foreground">
                This is a design prototype. Integrate your real payment provider APIs on the server.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} LuckyDrew. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:text-foreground" href="#">
              Terms
            </a>
            <a className="hover:text-foreground" href="#">
              Privacy
            </a>
            <a className="hover:text-foreground" href="#">
              Support
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
