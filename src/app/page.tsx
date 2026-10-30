"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Sidebar, NAV_ITEMS } from "@/components/layout/sidebar";
import { HeaderStats } from "@/components/dashboard/header-stats";
import { TemporalTab } from "@/components/dashboard/temporal-tab";
import { CategoriesTab } from "@/components/dashboard/categories-tab";
import { DistributionTab } from "@/components/dashboard/distribution-tab";
import { GeographyTab } from "@/components/dashboard/geography-tab";
import { PaymentsTab } from "@/components/dashboard/payments-tab";
import { InsightsTab } from "@/components/dashboard/insights-tab";
import { ExportModal } from "@/components/dashboard/export-modal";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("temporal");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const currentNavItem = NAV_ITEMS.find((item) => item.id === activeTab) || NAV_ITEMS[0];
  const CurrentIcon = currentNavItem.icon;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b12] dark:text-slate-100 relative overflow-x-hidden transition-colors duration-200">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[140px] opacity-40 dark:opacity-100" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] opacity-40 dark:opacity-100" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[140px] opacity-40 dark:opacity-100" />

      {/* Navigation Header */}
      <Navbar
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        isSidebarCollapsed={isSidebarCollapsed}
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* Main Layout Body: Sidebar + Content */}
      <div className="flex-1 flex w-full relative z-10">
        {/* Retractable Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Content Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex flex-col gap-8">
            {/* Hero & Context Banner */}
            <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="p-1 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                    <BarChart3 className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                    EXPLORATORY DATA ANALYSIS (EDA) • E-COMMERCE BRASIL
                  </span>
                  <Badge variant="success" className="text-[10px] font-semibold">
                    Dados Reais Tratados
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  E-Commerce Executive Analytics Platform
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                  Diagnóstico aprofundado com estatística descritiva, séries temporais de 24 meses,
                  decomposição de sazonalidade (Black Friday), distribuições de cauda longa, disparidade logística regional
                  e correlações estatísticas entre prazo de frete e satisfação do cliente (NPS).
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExportOpen(true)}
                  className="flex items-center gap-1.5 text-xs cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Exportar Dados</span>
                </Button>
              </div>
            </section>

            {/* Top KPI Cards (Volume, GMV, Ticket, NPS) */}
            <section>
              <HeaderStats />
            </section>

            {/* Active Analytical Module Section */}
            <section className="w-full">
              {/* Module Header / Breadcrumb */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200/80 dark:border-white/10 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <CurrentIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {currentNavItem.label}
                      </h2>
                      {currentNavItem.badge && (
                        <Badge variant="default" className="text-[10px] py-0 px-2 font-mono">
                          {currentNavItem.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {currentNavItem.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-2 shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span>Módulo Ativo</span>
                  </span>
                </div>
              </div>

              {/* Dynamic Module Content */}
              <div className="w-full">
                {activeTab === "temporal" && <TemporalTab />}
                {activeTab === "categories" && <CategoriesTab />}
                {activeTab === "distribution" && <DistributionTab />}
                {activeTab === "geography" && <GeographyTab />}
                {activeTab === "payments" && <PaymentsTab />}
                {activeTab === "insights" && <InsightsTab />}
              </div>
            </section>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}