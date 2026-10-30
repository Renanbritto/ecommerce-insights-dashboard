"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8 w-8 rounded-lg border border-slate-200/80 dark:border-white/10 bg-slate-100/50 dark:bg-white/5",
          className
        )}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer",
        "border border-slate-200/80 dark:border-white/15",
        "bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10",
        "text-slate-700 dark:text-slate-200",
        showLabel ? "px-3 py-1.5 gap-2 text-xs font-semibold" : "h-8 w-8",
        className
      )}
      title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
      aria-label={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
    >
      <div className="relative h-4 w-4 flex items-center justify-center">
        {/* Sun Icon for Light Mode */}
        <Sun
          className={cn(
            "h-4 w-4 transition-transform duration-300 text-amber-500",
            isDark ? "rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100"
          )}
        />
        {/* Moon Icon for Dark Mode */}
        <Moon
          className={cn(
            "h-4 w-4 transition-transform duration-300 text-cyan-400",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0 absolute"
          )}
        />
      </div>

      {showLabel && (
        <span className="text-xs">
          {isDark ? "Modo Claro" : "Modo Escuro"}
        </span>
      )}
    </button>
  );
}