"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Package,
  Sigma,
  MapPin,
  CreditCard,
  Target,
  BarChart3,
  Download,
  Layers,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#070b12] text-slate-100 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px]" />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex flex-col gap-8 relative z-10">
        {/* Hero & Context Banner */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <BarChart3 className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Exploratory Data Analysis (EDA) • E-Commerce Brasil
              </span>
              <Badge variant="success" className="text-[10px]">
                Dados Reais Tratados
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              E-Commerce Executive Analytics Platform
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
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
              className="flex items-center gap-1.5 border-white/15 text-xs text-slate-300 hover:text-white"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Exportar Dados</span>
            </Button>
          </div>
        </section>

        {/* Top KPI Cards (Volume, GMV, Ticket, NPS) */}
        <section>
          <HeaderStats />
        </section>

        {/* Tabbed Navigation for Analytical Modules */}
        <section className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Módulos de Estudo Estatístico</span>
              </div>

              <TabsList className="w-full sm:w-auto justify-start sm:justify-center">
                <TabsTrigger value="temporal" className="gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Séries Temporais</span>
                </TabsTrigger>
                <TabsTrigger value="categories" className="gap-1.5">
                  <Package className="h-3.5 w-3.5" />
                  <span>Top Categorias</span>
                </TabsTrigger>
                <TabsTrigger value="distribution" className="gap-1.5">
                  <Sigma className="h-3.5 w-3.5" />
                  <span>Distribuição & EDA</span>
                </TabsTrigger>
                <TabsTrigger value="geography" className="gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Geografia & Logística</span>
                </TabsTrigger>
                <TabsTrigger value="payments" className="gap-1.5">
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Meios de Pagamento</span>
                </TabsTrigger>
                <TabsTrigger value="insights" className="gap-1.5">
                  <Target className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Plano de Ação</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Temporal */}
            <TabsContent value="temporal">
              <TemporalTab />
            </TabsContent>

            {/* Tab 2: Categorias */}
            <TabsContent value="categories">
              <CategoriesTab />
            </TabsContent>

            {/* Tab 3: Distribuições */}
            <TabsContent value="distribution">
              <DistributionTab />
            </TabsContent>

            {/* Tab 4: Geografia */}
            <TabsContent value="geography">
              <GeographyTab />
            </TabsContent>

            {/* Tab 5: Meios de Pagamento */}
            <TabsContent value="payments">
              <PaymentsTab />
            </TabsContent>

            {/* Tab 6: Insights Executivos */}
            <TabsContent value="insights">
              <InsightsTab />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Export Modal */}
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
