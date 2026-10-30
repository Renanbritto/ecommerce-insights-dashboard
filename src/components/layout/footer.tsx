import React from "react";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 mt-16 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <Logo size="sm" />
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            RN <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">Intelligence</span> • E-Commerce Platform
          </span>
        </div>

        {/* Right: Clean links */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium">
          <Link
            href="https://github.com/Renanbritto/ecommerce-insights-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>Repositório GitHub</span>
          </Link>
          <span className="text-slate-300 dark:text-white/20">•</span>
          <Link
            href="https://renan-nocelli.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Renan Nocelli Britto
          </Link>
        </div>
      </div>
    </footer>
  );
}