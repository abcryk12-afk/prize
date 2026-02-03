"use client";

import React from "react";

export type Lang = "en" | "ur";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "luckydrew.lang";

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ur") {
      setLangState(saved);
    }
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ur" ? "rtl" : "ltr";
    document.body.classList.toggle("font-urdu", lang === "ur");
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = React.useCallback((next: Lang) => setLangState(next), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used inside LanguageProvider");
  }
  return ctx;
};

export const pickLang = (lang: Lang, en: string, ur: string) => (lang === "ur" ? ur : en);
