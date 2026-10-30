"use client";

import React from "react";
import {
  TrendingUp,
  Package,
  Sigma,
  MapPin,
  CreditCard,
  Target,
  ChevronLeft,
  ChevronRight,
  Database,
  CheckCircle2,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "temporal",
    label: "Séries Temporais",
    shortLabel: "Temporal",
    icon: TrendingUp,
    badge: "24m",
    description: "Sazonalidade & Black Friday",
  },
  {
    id: "categories",
    label: "Top Categorias",
    shortLabel: "Categorias",
    icon: Package,
    badge: "Pareto",
    description: "Curva ABC & Share GMV",
  },
  {
    id: "distribution",
    label: "Distribuição & EDA",
    shortLabel: "Distribuição",
    icon: Sigma,
    badge: "Outliers",
    description: "Assimetria & Cauda Longa",
  },
  {
    id: "geography",
    label: "Geografia & Logística",
    shortLabel: "Logística",
    icon: MapPin,
    badge: "SLA",
    description: "Prazo, Frete & Regiões",
  },
  {
    id: "payments",
    label: "Meios de Pagamento",
    shortLabel: "Pagamentos",
    icon: CreditCard,
    badge: "Mix",
    description: "Cartão, Boleto & Parcelas",
  },
  {
    id: "insights",
    label: "Plano de Ação",
    shortLabel: "Insights",
    icon: Target,
    badge: "Executivo",
    description: "Recomendações de Negócio",
  },
];

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 dark:bg-black/75 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]",
          "flex flex-col bg-white/95 dark:bg-slate-950/85 backdrop-blur-xl border-r border-slate-200/80 dark:border-white/10",
          "transition-all duration-300 ease-in-out select-none shadow-md lg:shadow-none",
          // Mobile state: slide in/out
          mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0",
          // Desktop state: collapsed or expanded
          !mobileOpen && (isCollapsed ? "lg:w-20" : "lg:w-72")
        )}
      >
        {/* Header / Toggle Section */}
        <div className="flex items-center justify-between h-14 px-3.5 border-b border-slate-200/80 dark:border-white/10 shrink-0">
          <div
            className={cn(
              "flex items-center gap-2.5 overflow-hidden transition-all duration-300",
              isCollapsed && !mobileOpen ? "lg:opacity-0 lg:w-0" : "opacity-100"
            )}
          >
            <Logo size="sm" />
            <div className="flex flex-col leading-tight whitespace-nowrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                RN Intelligence
              </span>
              <span className="text-[9px] text-cyan-600 dark:text-cyan-400 font-semibold">
                6 Módulos Analíticos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className={cn(
                "hidden lg:flex items-center justify-center h-8 w-8 rounded-lg",
                "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10",
                "transition-colors cursor-pointer",
                isCollapsed && "mx-auto w-full"
              )}
              title={isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
              aria-label={isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden flex items-center justify-center h-8 w-8 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Fechar menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2.5 space-y-1.5 custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={cn(
                  "group relative w-full flex items-center rounded-xl text-left transition-all duration-200 cursor-pointer",
                  // Layout when collapsed vs expanded
                  isCollapsed && !mobileOpen
                    ? "lg:justify-center lg:px-0 lg:py-2.5"
                    : "px-3 py-2.5 gap-3",
                  // Active vs Inactive styles
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 border border-cyan-400/40"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                )}
                title={isCollapsed && !mobileOpen ? `${item.label} — ${item.description}` : undefined}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex items-center justify-center shrink-0 transition-transform duration-200",
                    isCollapsed && !mobileOpen ? "h-9 w-9 rounded-lg" : "h-7 w-7",
                    isActive
                      ? "text-white group-hover:scale-105"
                      : "text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isCollapsed && !mobileOpen && "h-5 w-5")} />
                </div>

                {/* Text Labels (when expanded) */}
                <div
                  className={cn(
                    "flex-1 min-w-0 transition-all duration-200",
                    isCollapsed && !mobileOpen ? "lg:hidden" : "block"
                  )}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs font-bold truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded-md font-mono tracking-wide shrink-0",
                          isActive
                            ? "bg-white/20 text-white border border-white/30"
                            : "bg-slate-200/70 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-300/70 dark:border-white/10 group-hover:text-cyan-600 dark:group-hover:text-cyan-300"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-[10px] truncate leading-tight mt-0.5",
                      isActive ? "text-cyan-100" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400"
                    )}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Active Indicator Bar on Collapsed */}
                {isActive && isCollapsed && !mobileOpen && (
                  <span className="hidden lg:block absolute left-1 top-2 bottom-2 w-1 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer / Info Block */}
        <div className="p-3 border-t border-slate-200/80 dark:border-white/10 shrink-0">
          {isCollapsed && !mobileOpen ? (
            <div
              className="hidden lg:flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              title="RN Intelligence • 98.247 Pedidos Tratados"
            >
              <Database className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </div>
          ) : (
            <div className="rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 p-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  RN Intelligence
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> 100%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-snug">
                98.247 pedidos reais com tratamento de outliers e engenharia de features.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}