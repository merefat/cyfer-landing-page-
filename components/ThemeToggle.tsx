"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    const root = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (nextTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#17283b");
      try {
        localStorage.setItem("cyfer-theme", "dark");
      } catch {}
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#ffffff");
      try {
        localStorage.setItem("cyfer-theme", "light");
      } catch {}
    }
  };

  if (!mounted) {
    return (
      <div 
        className={`w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] animate-pulse ${className}`} 
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1fbbd2] bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-300/80 dark:border-white/[0.1] text-slate-700 dark:text-slate-200 shadow-sm active:scale-95 ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[#f39c12] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#17283b] transition-transform duration-300 -rotate-12" />
      )}
    </button>
  );
}

