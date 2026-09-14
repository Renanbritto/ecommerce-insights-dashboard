"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportModal } from "@/components/dashboard/export-modal";
import { GithubIcon } from "@/components/ui/github-icon";

export function Navbar() {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                  E-Commerce Insights
                </span>
                <span className="hidden md:inline-flex">
                  <Badge variant="default" className="text-[10px] py-0 px-2">
                    EDA Platform
                  </Badge>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Brazilian E-Commerce Public Dataset • 98.2k Orders
              </p>
            </div>
          </div>

          {/* Badges / Tech Pill */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Next.js 16 • Shadcn UI • Recharts
            </span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExportOpen(true)}
              className="flex items-center gap-1.5 border-white/15 text-xs text-slate-200 hover:text-white"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Exportar Dados</span>
              <span className="sm:hidden">Exportar</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              asChild
              className="hidden sm:inline-flex items-center gap-1.5 text-xs"
            >
              <Link
                href="https://github.com/Renanbritto/ecommerce-insights-dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </Link>
            </Button>

            <Button
              variant="cyan"
              size="sm"
              asChild
              className="flex items-center gap-1.5 text-xs"
            >
              <Link
                href="https://renan-nocelli.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Portfólio</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </>
  );
}