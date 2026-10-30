"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  Menu,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { ExportModal } from "@/components/dashboard/export-modal";
import { GithubIcon } from "@/components/ui/github-icon";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  onOpenMobileSidebar?: () => void;
}

export function Navbar({
  onToggleSidebar,
  isSidebarCollapsed,
  onOpenMobileSidebar,
}: NavbarProps) {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/85 backdrop-blur-xl transition-colors duration-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile trigger, Desktop collapse trigger & Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            {onOpenMobileSidebar && (
              <button
                type="button"
                onClick={onOpenMobileSidebar}
                className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            {/* Desktop Quick Toggle Button */}
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="hidden lg:flex p-2 -ml-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                title={isSidebarCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
                aria-label="Alternar menu lateral"
              >
                {isSidebarCollapsed ? (
                  <PanelLeft className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Logo & E-Commerce Insights Title */}
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                    E-Commerce{" "}
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                      Insights
                    </span>
                  </span>
                  <span className="hidden md:inline-flex">
                    <Badge variant="default" className="text-[10px] py-0 px-2 font-semibold">
                      EDA Platform
                    </Badge>
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  Brazilian E-Commerce Public Dataset • 98.2k Orders
                </p>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Exportar Dados Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExportOpen(true)}
              className="flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden sm:inline">Exportar Dados</span>
              <span className="sm:hidden">Exportar</span>
            </Button>

            {/* GitHub Button */}
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="flex items-center gap-1.5 text-xs"
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
          </div>
        </div>
      </header>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </>
  );
}