"use client";

import React, { useState, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Label,
} from "recharts";
import {
  MapPin,
  Truck,
  Compass,
  TrendingUp,
  Activity,
  Layers,
  Search,
  ArrowUpRight,
  Calculator,
  PackageCheck,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { STATES_DATA } from "@/data/ecommerce-dataset";
import { BrazilMap } from "@/components/dashboard/brazil-map";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { StateMetric } from "@/types";

// Classificação analítica de cada estado com base no cruzamento Frete vs Lead Time
function getLogisticsClassification(st: StateMetric) {
  if (st.uf === "SP") {
    return {
      title: "Hub Nacional Central",
      badgeVariant: "cyan" as const,
      description: "Origem primária de mercadorias. Menor frete (R$ 15,40) e entrega mais rápida (8,2d).",
      zone: "Hub Central",
    };
  }
  if (st.region === "Sudeste" || st.uf === "PR" || st.uf === "DF") {
    return {
      title: "Zona de Alta Eficiência",
      badgeVariant: "success" as const,
      description: "Excelente malha rodoviária com lead time inferior a 12 dias e frete competitivo.",
      zone: "Alta Eficiência",
    };
  }
  if (st.region === "Sul" || st.uf === "GO" || st.uf === "MS") {
    return {
      title: "Mercado Maduro Consolidado",
      badgeVariant: "blue" as const,
      description: "Fluxo regular de frete fracionado com equilíbrio de volume e margem de contribuição.",
      zone: "Mercado Maduro",
    };
  }
  return {
    title: "Zona Crítica de Fricção Logística",
    badgeVariant: "warning" as const,
    description: "Frete superior a R$ 34 e lead time > 18 dias geram abandono no checkout e risco de devolução.",
    zone: "Gargalo & Oportunidade",
  };
}

// Recomendações estratégicas sob medida por macrorregião
function getRegionalStrategy(region: string, uf: string) {
  if (uf === "SP") {
    return "Foco em last-mile ultra-rápido (entregas D+0 e D+1 na Grande SP) para elevar a barreira competitiva de mercado e fidelização primária.";
  }
  if (region === "Sudeste") {
    return "Expandir rotas dedicadas de cross-docking saindo de Barueri e Cajamar para acelerar entregas no interior de MG e RJ.";
  }
  if (region === "Sul") {
    return "Consolidar parcerias com transportadoras locais 3PL especializadas na malha Sul (PR/SC/RS), reduzindo a dependência dos Correios.";
  }
  if (region === "Nordeste") {
    return "Implantação de Centro de Distribuição Avançado em Recife ou Salvador para SKUs de curva A. Redução potencial de 72% no lead time.";
  }
  if (region === "Centro-Oeste") {
    return "Utilizar Brasília e Goiânia como entreposto logístico estratégico de transbordo e redução de custos com frete fracionado.";
  }
  return "Operação mista de consolidação aérea prioritária para curva A e integração de malhas fluviais para cargas volumosas.";
}

export function GeographyTab() {
  const [selectedUf, setSelectedUf] = useState<string | null>("SP");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof StateMetric>("orders");
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Estados do Simulador de Fulfillment Hub
  const [simulatedHub, setSimulatedHub] = useState<"NE" | "N" | "CO">("NE");
  const [penetrationPct, setPenetrationPct] = useState<number>(60);

  // Estado atualmente selecionado para o painel de telemetria
  const activeStateData = useMemo(() => {
    if (!selectedUf) return STATES_DATA.find((s) => s.uf === "SP") || STATES_DATA[0];
    return STATES_DATA.find((s) => s.uf === selectedUf) || STATES_DATA[0];
  }, [selectedUf]);

  // Lista de macrorregiões para filtro
  const regionsList = useMemo(() => {
    const list = Array.from(new Set(STATES_DATA.map((s) => s.region)));
    return ["all", ...list];
  }, []);

  // Tabela filtrada e ordenada
  const filteredAndSortedStates = useMemo(() => {
    return STATES_DATA.filter((s) => {
      const matchesRegion =
        selectedRegionFilter === "all" || s.region === selectedRegionFilter;
      const matchesSearch =
        s.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.uf.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    }).sort((a, b) => {
      const factor = sortAsc ? 1 : -1;
      if (a[sortField] < b[sortField]) return -1 * factor;
      if (a[sortField] > b[sortField]) return 1 * factor;
      return 0;
    });
  }, [selectedRegionFilter, searchQuery, sortField, sortAsc]);

  // Cálculo ao vivo dos impactos do Simulador de Fulfillment Hub
  const simulationResults = useMemo(() => {
    if (simulatedHub === "NE") {
      const baseFreight = 34.16;
      const baseDays = 19.4;
      const targetStates = STATES_DATA.filter((s) => s.region === "Nordeste");
      const currentRegionalGmv = targetStates.reduce((acc, s) => acc + s.revenue, 0);

      const freightReductionFactor = 0.48 * (penetrationPct / 100);
      const daysReductionFactor = 0.74 * (penetrationPct / 100);

      const newFreight = baseFreight * (1 - freightReductionFactor);
      const newDays = baseDays * (1 - daysReductionFactor);
      const abandonmentDrop = 38 * (penetrationPct / 100);
      const gmvUpliftPct = 42 * (penetrationPct / 100);
      const estimatedGmvGain = currentRegionalGmv * (gmvUpliftPct / 100);

      return {
        hubName: "Hub Nordeste (Recife & Salvador)",
        coverage: "9 Estados (BA, PE, CE, MA, PB, RN, PI, AL, SE)",
        leadTimeReductionPct: Math.round(daysReductionFactor * 100),
        newDays: newDays.toFixed(1),
        oldDays: baseDays.toFixed(1),
        freightSavingsPct: Math.round(freightReductionFactor * 100),
        newFreight: newFreight.toFixed(2),
        oldFreight: baseFreight.toFixed(2),
        abandonmentDrop: Math.round(abandonmentDrop),
        gmvGain: estimatedGmvGain,
        npsImpact: "+0.68 pts",
      };
    }

    if (simulatedHub === "N") {
      const baseFreight = 42.15;
      const baseDays = 24.8;
      const targetStates = STATES_DATA.filter((s) => s.region === "Norte");
      const currentRegionalGmv = targetStates.reduce((acc, s) => acc + s.revenue, 0);

      const freightReductionFactor = 0.42 * (penetrationPct / 100);
      const daysReductionFactor = 0.68 * (penetrationPct / 100);

      const newFreight = baseFreight * (1 - freightReductionFactor);
      const newDays = baseDays * (1 - daysReductionFactor);
      const abandonmentDrop = 45 * (penetrationPct / 100);
      const gmvUpliftPct = 52 * (penetrationPct / 100);
      const estimatedGmvGain = currentRegionalGmv * (gmvUpliftPct / 100);

      return {
        hubName: "Hub Norte (Belém & Manaus)",
        coverage: "7 Estados (PA, AM, TO, RO, AC, AP, RR)",
        leadTimeReductionPct: Math.round(daysReductionFactor * 100),
        newDays: newDays.toFixed(1),
        oldDays: baseDays.toFixed(1),
        freightSavingsPct: Math.round(freightReductionFactor * 100),
        newFreight: newFreight.toFixed(2),
        oldFreight: baseFreight.toFixed(2),
        abandonmentDrop: Math.round(abandonmentDrop),
        gmvGain: estimatedGmvGain,
        npsImpact: "+0.82 pts",
      };
    }

    // Centro-Oeste
    const baseFreight = 27.4;
    const baseDays = 14.5;
    const targetStates = STATES_DATA.filter((s) => s.region === "Centro-Oeste");
    const currentRegionalGmv = targetStates.reduce((acc, s) => acc + s.revenue, 0);

    const freightReductionFactor = 0.35 * (penetrationPct / 100);
    const daysReductionFactor = 0.55 * (penetrationPct / 100);

    const newFreight = baseFreight * (1 - freightReductionFactor);
    const newDays = baseDays * (1 - daysReductionFactor);
    const abandonmentDrop = 28 * (penetrationPct / 100);
    const gmvUpliftPct = 30 * (penetrationPct / 100);
    const estimatedGmvGain = currentRegionalGmv * (gmvUpliftPct / 100);

    return {
      hubName: "Hub Centro-Oeste (Brasília & Goiânia)",
      coverage: "4 Estados (DF, GO, MT, MS)",
      leadTimeReductionPct: Math.round(daysReductionFactor * 100),
      newDays: newDays.toFixed(1),
      oldDays: baseDays.toFixed(1),
      freightSavingsPct: Math.round(freightReductionFactor * 100),
      newFreight: newFreight.toFixed(2),
      oldFreight: baseFreight.toFixed(2),
      abandonmentDrop: Math.round(abandonmentDrop),
      gmvGain: estimatedGmvGain,
      npsImpact: "+0.45 pts",
    };
  }, [simulatedHub, penetrationPct]);

  // Função auxiliar para ordenar tabela
  const handleSort = (field: keyof StateMetric) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const activeClassification = getLogisticsClassification(activeStateData);
  const activeStrategy = getRegionalStrategy(activeStateData.region, activeStateData.uf);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header & KPI Strip Executivo de Logística Nacional */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="liquid-card border-cyan-500/25 bg-cyan-500/5">
          <CardContent className="p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                Concentração Sudeste
              </span>
              <Badge variant="cyan" className="text-[10px] font-semibold">
                Origem & Volume
              </Badge>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
              69,9%
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              68.530 pedidos consolidados em SP, RJ, MG e ES.
            </p>
          </CardContent>
        </Card>

        <Card className="liquid-card border-emerald-500/25 bg-emerald-500/5">
          <CardContent className="p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Frete Médio Ponderado
              </span>
              <Badge variant="success" className="text-[10px] font-semibold">
                Nacional
              </Badge>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
              R$ 19,99
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mediana de R$ 17,20. SP tem o menor frete (R$ 15,40).
            </p>
          </CardContent>
        </Card>

        <Card className="liquid-card border-amber-500/25 bg-amber-500/5">
          <CardContent className="p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Lead Time Médio SLA
              </span>
              <Badge variant="warning" className="text-[10px] font-semibold">
                Trânsito Brasil
              </Badge>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
              12,4 dias
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Correlação inversa com NPS: degradação após o 15º dia.
            </p>
          </CardContent>
        </Card>

        <Card className="liquid-card border-rose-500/25 bg-rose-500/5">
          <CardContent className="p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                Disparidade Regional
              </span>
              <Badge variant="destructive" className="text-[10px] font-semibold">
                Fricção Norte
              </Badge>
            </div>
            <p className="text-2xl font-black text-rose-600 dark:text-rose-400 tracking-tight font-mono">
              +178%
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Frete Norte (R$ 42,90) vs Sudeste (R$ 15,40).
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Seção Principal: Mapa Interativo do Brasil + Painel de Telemetria do Estado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna da Esquerda: Mapa Interativo do Brasil */}
        <Card className="liquid-card lg:col-span-7 flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <MapPin className="h-4 w-4" />
                </span>
                <CardTitle className="text-base sm:text-lg">
                  Mapa Geográfico Interativo do Brasil
                </CardTitle>
              </div>
              <Badge variant="cyan" className="text-[10px] font-semibold">
                27 Unidades Federativas
              </Badge>
            </div>
            <CardDescription>
              Explore a distribuição territorial das 98.247 ordens. Alterne entre volume de pedidos, custo de frete e lead time médio por estado.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 flex flex-col items-center">
            <BrazilMap selectedUf={selectedUf} onSelectUf={setSelectedUf} />
          </CardContent>
        </Card>

        {/* Coluna da Direita: Painel de Telemetria Detalhada da UF Selecionada */}
        <Card className="liquid-card lg:col-span-5 flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <Activity className="h-4 w-4" />
                </span>
                <CardTitle className="text-base sm:text-lg">
                  Telemetria do Estado Selecionado
                </CardTitle>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                AO VIVO
              </span>
            </div>
            <CardDescription>
              Diagnóstico aprofundado de demanda, nível de serviço e fricção de checkout.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 flex flex-col gap-4">
            {/* Cabeçalho do Estado */}
            <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center font-mono font-black text-xl text-cyan-600 dark:text-cyan-400 shadow-2xs">
                  {activeStateData.uf}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {activeStateData.state}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Região {activeStateData.region} • Código IBGE
                  </p>
                </div>
              </div>
              <Badge variant={activeClassification.badgeVariant} className="text-[11px] font-semibold py-1 px-2.5">
                {activeClassification.zone}
              </Badge>
            </div>

            {/* Grid de Métricas da UF */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5 flex flex-col gap-1 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <PackageCheck className="h-3 w-3 text-cyan-500" />
                  Volume de Pedidos
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {formatNumber(activeStateData.orders)}
                </span>
                <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                  {activeStateData.pct.toFixed(1)}% do total nacional
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5 flex flex-col gap-1 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-emerald-500" />
                  Receita Transacionada (GMV)
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {formatCurrency(activeStateData.revenue)}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ticket Médio: R$ {(activeStateData.revenue / activeStateData.orders).toFixed(2)}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5 flex flex-col gap-1 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Truck className="h-3 w-3 text-amber-500" />
                  Custo Médio de Frete
                </span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {formatCurrency(activeStateData.avgFreight)}
                </span>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  {activeStateData.uf === "SP"
                    ? "Benchmark Mínimo Nacional"
                    : `+${Math.round(((activeStateData.avgFreight - 15.4) / 15.4) * 100)}% vs Hub SP`}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5 flex flex-col gap-1 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  Lead Time Médio (Dias)
                </span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
                  {activeStateData.avgDays.toFixed(1)} dias
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeStateData.avgDays <= 12
                    ? "NPS Seguro (> 4.2)"
                    : activeStateData.avgDays <= 18
                    ? "Alerta de Satisfação"
                    : "Zona de Risco Severo"}
                </span>
              </div>
            </div>

            {/* Diagnóstico Operacional & Recomendação de Negócio */}
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                <Compass className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                Diagnóstico & Plano Recomendado
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeClassification.description}
              </p>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-cyan-500/20 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <strong className="text-cyan-700 dark:text-cyan-400">Estratégia de Supply Chain:</strong>{" "}
                {activeStrategy}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Matriz de Eficiência Logística: Scatter Plot de Quadrantes com Recharts */}
      <Card className="liquid-card">
        <CardHeader className="pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <TrendingUp className="h-4 w-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">
                Matriz de Eficiência Logística: Custo de Frete vs Lead Time
              </CardTitle>
            </div>
            <Badge variant="cyan" className="text-[10px] font-semibold">
              Análise Multivariada (27 UFs)
            </Badge>
          </div>
          <CardDescription>
            Cruzamento entre o custo médio de frete (Eixo Y) e o prazo médio de trânsito em dias (Eixo X). O tamanho de cada bolha reflete o volume de pedidos transacionados.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 flex flex-col gap-4">
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis
                  type="number"
                  dataKey="avgDays"
                  name="Prazo de Entrega (dias)"
                  unit="d"
                  domain={[5, 30]}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
                >
                  <Label
                    value="Lead Time Médio de Entrega (Dias)"
                    offset={-10}
                    position="insideBottom"
                    fill="#94a3b8"
                    fontSize={11}
                  />
                </XAxis>
                <YAxis
                  type="number"
                  dataKey="avgFreight"
                  name="Frete Médio (R$)"
                  unit="R$"
                  domain={[10, 50]}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                >
                  <Label
                    value="Custo Médio de Frete (R$)"
                    angle={-90}
                    position="insideLeft"
                    fill="#94a3b8"
                    fontSize={11}
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>

                {/* Linhas de corte dos quadrantes de referência */}
                <ReferenceLine
                  x={15}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{
                    value: "SLA Crítico (15d)",
                    position: "top",
                    fill: "#ef4444",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                />
                <ReferenceLine
                  y={25}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  label={{
                    value: "Teto de Frete Competitivo (R$ 25)",
                    position: "right",
                    fill: "#f59e0b",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                />

                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as StateMetric;
                    return (
                      <div className="rounded-xl p-3.5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/20 text-xs shadow-2xl min-w-[210px]">
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200 dark:border-white/10">
                          <span className="font-extrabold text-cyan-600 dark:text-cyan-400">
                            {d.state} ({d.uf})
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {d.region}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-slate-700 dark:text-slate-300">
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Pedidos:</span>
                            <strong className="text-slate-900 dark:text-white font-mono">
                              {formatNumber(d.orders)} ({d.pct.toFixed(1)}%)
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Frete Médio:</span>
                            <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                              {formatCurrency(d.avgFreight)}
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Prazo Médio:</span>
                            <strong className="text-amber-600 dark:text-amber-400 font-mono">
                              {d.avgDays.toFixed(1)} dias
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Receita Total:</span>
                            <strong className="text-slate-900 dark:text-white font-mono">
                              {formatCurrency(d.revenue)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />

                <Scatter
                  name="Estados"
                  data={STATES_DATA}
                  onClick={(entry: any) => setSelectedUf(entry?.payload?.uf || entry?.uf || null)}
                >
                  {STATES_DATA.map((entry) => {
                    const isSelected = selectedUf === entry.uf;
                    let color = "#3b82f6";
                    if (entry.region === "Sudeste") color = "#06b6d4";
                    else if (entry.region === "Sul") color = "#3b82f6";
                    else if (entry.region === "Centro-Oeste") color = "#8b5cf6";
                    else if (entry.region === "Nordeste") color = "#f59e0b";
                    else if (entry.region === "Norte") color = "#ef4444";

                    return (
                      <Cell
                        key={`scatter-${entry.uf}`}
                        fill={color}
                        stroke={isSelected ? "#ffffff" : color}
                        strokeWidth={isSelected ? 3 : 1}
                        fillOpacity={isSelected ? 1 : 0.8}
                        className="cursor-pointer transition-all hover:scale-125"
                      />
                    );
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda Explicativa dos 4 Quadrantes Estratégicos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 border-t border-slate-200/80 dark:border-white/10 text-xs">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Q1: Excelência Operacional
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                <strong>SP, PR, DF, SC</strong> • Frete &lt; R$ 25 e prazo &lt; 14d. Maior conversão de checkout e baixo cancelamento.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col gap-1">
              <span className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" />
                Q2: Trânsito Moderado
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                <strong>RJ, MG, RS, GO, MS</strong> • Frete equilibrado com prazos de 12 a 16d. Boa margem de retenção.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                Q3: Fricção em Expansão
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                <strong>BA, MT, ES</strong> • Custo e prazo limítrofes geram oportunidade com hubs regionais.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex flex-col gap-1">
              <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                Q4: Gargalo Crítico de Abandono
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                <strong>Norte & Nordeste</strong> • Frete &gt; R$ 34 e prazo &gt; 19d causam abandono massivo de carrinho (&gt; 65%).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Simulador Estratégico de Fulfillment Hub ("Calculadora de Impacto Regional") */}
      <Card className="liquid-card border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 via-slate-500/5 to-transparent">
        <CardHeader className="pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Calculator className="h-4 w-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">
                Simulador Estratégico de Fulfillment Hub Regional
              </CardTitle>
            </div>
            <Badge variant="cyan" className="text-xs font-semibold py-1 px-3">
              Projeção P&L e Nível de Serviço
            </Badge>
          </div>
          <CardDescription>
            Simule o impacto financeiro e logístico da implantação de um Centro de Distribuição (CD) avançado para produtos de alto giro (curva A).
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 flex flex-col gap-6">
          {/* Controles da Simulação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Escolha do Hub Regional */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                1. Selecione a Região do Novo Hub:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSimulatedHub("NE")}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    simulatedHub === "NE"
                      ? "bg-cyan-500/15 border-cyan-500/50 shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Hub Nordeste
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Recife / Salvador
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSimulatedHub("N")}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    simulatedHub === "N"
                      ? "bg-cyan-500/15 border-cyan-500/50 shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Hub Norte
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Belém / Manaus
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSimulatedHub("CO")}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    simulatedHub === "CO"
                      ? "bg-cyan-500/15 border-cyan-500/50 shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Hub Centro-Oeste
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Brasília / Goiânia
                  </span>
                </button>
              </div>
            </div>

            {/* Slider de Penetração Curva A */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-cyan-500" />
                  2. Penetração de Estoque Curva A:
                </label>
                <span className="text-xs font-mono font-black text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-md">
                  {penetrationPct}% dos SKUs
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="10"
                value={penetrationPct}
                onChange={(e) => setPenetrationPct(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>20% (Piloto)</span>
                <span>50% (Equilibrado)</span>
                <span>90% (Avançado Total)</span>
              </div>
            </div>
          </div>

          {/* Cards de Métricas Calculadas pelo Simulador */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 flex flex-col gap-1 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Redução de Lead Time
              </span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                -{simulationResults.leadTimeReductionPct}%
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                De {simulationResults.oldDays}d para{" "}
                <strong className="text-slate-900 dark:text-white font-mono">{simulationResults.newDays}d</strong>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 flex flex-col gap-1 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Economia no Frete
              </span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                -{simulationResults.freightSavingsPct}%
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                De R$ {simulationResults.oldFreight} para{" "}
                <strong className="text-slate-900 dark:text-white font-mono">R$ {simulationResults.newFreight}</strong>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 flex flex-col gap-1 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Queda no Abandono
              </span>
              <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                -{simulationResults.abandonmentDrop}%
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                Mais pedidos convertidos
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 flex flex-col gap-1 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Ganho Projetado GMV
              </span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                +{formatCurrency(simulationResults.gmvGain)}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                Impacto incremental anual
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 flex flex-col gap-1 shadow-2xs col-span-2 md:col-span-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Elevação do NPS
              </span>
              <span className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {simulationResults.npsImpact}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                Em avaliações 5 estrelas
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Tabela Completa de Estados com Busca, Filtro e Ordenação */}
      <Card className="liquid-card">
        <CardHeader className="pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Layers className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Tabela Detalhada das 27 Unidades Federativas
                </CardTitle>
                <CardDescription>
                  Filtre por macrorregião, busque por UF e ordene as métricas clicando nos cabeçalhos das colunas.
                </CardDescription>
              </div>
            </div>

            {/* Filtros e Busca */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar UF ou Estado..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs rounded-lg outline-none focus:border-cyan-500 w-44 shadow-2xs"
                />
              </div>

              {/* Seletor de Região */}
              <select
                value={selectedRegionFilter}
                onChange={(e) => setSelectedRegionFilter(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-2.5 py-1 outline-none focus:border-cyan-500 cursor-pointer shadow-2xs font-medium"
              >
                <option value="all">Todas as Regiões</option>
                {regionsList
                  .filter((r) => r !== "all")
                  .map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="max-h-[460px] overflow-y-auto pr-1">
            <Table>
              <TableHeader className="sticky top-0 bg-slate-100/95 dark:bg-slate-950/95 backdrop-blur-md z-10">
                <TableRow>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("state")}>
                    Estado (UF) {sortField === "state" && (sortAsc ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("region")}>
                    Região {sortField === "region" && (sortAsc ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="text-right cursor-pointer select-none" onClick={() => handleSort("orders")}>
                    Pedidos {sortField === "orders" && (sortAsc ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="text-right cursor-pointer select-none" onClick={() => handleSort("pct")}>
                    Part. % {sortField === "pct" && (sortAsc ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="text-right cursor-pointer select-none" onClick={() => handleSort("avgFreight")}>
                    Frete Médio {sortField === "avgFreight" && (sortAsc ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="text-right cursor-pointer select-none" onClick={() => handleSort("avgDays")}>
                    Lead Time {sortField === "avgDays" && (sortAsc ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="text-right cursor-pointer select-none" onClick={() => handleSort("revenue")}>
                    Receita (GMV) {sortField === "revenue" && (sortAsc ? "▲" : "▼")}
                  </TableHead>
                  <TableHead className="text-center">Classificação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedStates.map((st) => {
                  const classification = getLogisticsClassification(st);
                  const isSelected = selectedUf === st.uf;

                  return (
                    <TableRow
                      key={st.uf}
                      onClick={() => setSelectedUf(st.uf)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-cyan-500/15 dark:bg-cyan-500/20 font-medium"
                          : "hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <TableCell className="font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs">
                            {st.uf}
                          </span>
                          <span className="text-xs text-slate-800 dark:text-slate-200">
                            {st.state}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 dark:text-slate-400">
                        {st.region}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-900 dark:text-white font-semibold">
                        {formatNumber(st.orders)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-500 dark:text-slate-400 text-xs">
                        {st.pct.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {formatCurrency(st.avgFreight)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-amber-600 dark:text-amber-400 font-medium">
                        {st.avgDays.toFixed(1)} d
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-800 dark:text-slate-200 font-medium">
                        {formatCurrency(st.revenue)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={classification.badgeVariant} className="text-[10px] font-semibold">
                          {classification.zone}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
