"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      title={isDark ? "Switch to Daylight Mode" : "Switch to Obsidian Dark Mode"}
      className={cn(
        "group relative inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 hover:border-orange-500/50 dark:hover:border-emerald-500/50 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-all",
        className
      )}
    >
      <Sun className="h-3.5 w-3.5 text-orange-500 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute left-2.5 h-3.5 w-3.5 text-emerald-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="hidden sm:inline-block pl-0.5 text-[11px] uppercase tracking-wider">
        {mounted ? (isDark ? "Obsidian" : "Daylight") : "Obsidian"}
      </span>
    </button>
  );
}
