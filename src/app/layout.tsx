import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import { LanguageProvider } from "@/lib/lang";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LuckyDrew — Premium Prize Competitions",
  description: "Premium prize competitions for Pakistan with wallet-based entries and verified draws.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urdu.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          <div className="min-h-screen bg-[radial-gradient(70%_55%_at_15%_10%,rgba(212,175,55,0.16),transparent_55%),radial-gradient(70%_60%_at_85%_0%,rgba(110,168,255,0.14),transparent_55%)]">
            <SiteHeader />
            <main className="pb-12">{children}</main>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
