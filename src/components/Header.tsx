"use client";

import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="bg-white dark:bg-zinc-950 text-emerald-600 dark:text-emerald-500 font-inter antialiased tracking-tight fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto w-full">
        <div className="text-xl font-black tracking-tighter text-emerald-600 dark:text-emerald-500 uppercase">
          PulseRelay
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => {
              document
                .getElementById("cta-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-primary text-on-primary font-text-sm text-text-sm px-4 py-2 hover:bg-primary-hover transition-colors active:scale-95 duration-100"
          >
            Join Waiting List
          </button>
        </div>
      </div>
    </header>
  );
}