"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Lightbulb, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MONTHLY_TRENDS } from "@/data/ecommerce-dataset";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function TemporalTab() {
  const [metric, setMetric] = useState<"revenue" | "orders" | "avgTicket" | "avgReview">("revenue");
  const [yearFilter, setYearFilter] = useState<"all" | 2022 | 2023>("all");

  const filteredData = useMemo(() => {
    if (yearFilter === "all") return MONTHLY_TRENDS;
    return MONTHLY_TRENDS.filter((d) => d.year === yearFilter);
  }, [yearFilter]);

  const metricConfig = {
    revenue: {
      label: "Faturamento (GMV)",
      color: "#06b6d4",
      gradientId: "gradRevenue",
      formatter: (val: number) => `R$ ${(val / 1000).toFixed(0)}k`,
      fullFormatter: (val: number) => formatCurrency(val),
    },
    orders: {
      label: "Volume de Pedidos",
      color: "#3b82f6",
      gradientId: "gradOrders",
      formatter: (val: number) => `${(val / 1000).toFixed(1)}k`,
      fullFormatter: (val: number) => `${formatNumber(val)} pedidos`,
    },
    avgTicket: {
      label: "Ticket Médio",
      color: "#10b981",
      gradientId: "gradTicket",
      formatter: (val: number) => `R$ ${val.toFixed(0)}`,
      fullFormatter: (val: number) => formatCurrency(val),
    },
    avgReview: {
      label: "Satisfação Média (NPS)",
      color: "#f59e0b",
      gradientId: "gradReview",
      formatter: (val: number) => val.toFixed(2),
      fullFormatter: (val: number) => `NPS: ${val.toFixed(2)} / 5.0`,
    },
  };

  const currentConfig = metricConfig[metric];

  return (
    <div className="flex flex-col gap-6">
      <Card className="liquid-card">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/70 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <TrendingUp className="h-4 w-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">
                Evolução Temporal & Sazonalidade (24 Meses)
              </CardTitle>
            </div>
            <CardDescription>
              Acompanhe a curva de crescimento mensal, efeitos sazonais e o impacto da Black Friday nos índices operacionais.
            </CardDescription>
          </div>

          {/* Filtros e Controles de Métrica */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Seletor de Ano */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-xs">
              {(["all", 2022, 2023] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => setYearFilter(yr)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    yearFilter === yr
                      ? "bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {yr === "all" ? "24 Meses" : yr}
                </button>
              ))}
            </div>

            {/* Seletor de Métrica */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-xs">
              {(
                [
                  { id: "revenue", label: "Receita" },
                  { id: "orders", label: "Pedidos" },
                  { id: "avgTicket", label: "Ticket" },
                  { id: "avgReview", label: "NPS" },
                ] as const
              ).map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setMetric(btn.id)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    metric === btn.id
                      ? "bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 dark:border-cyan-500/40 shadow-2xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="h-[360px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradTicket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradReview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={currentConfig.formatter}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-xl p-3.5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/20 text-xs shadow-2xl min-w-[220px]">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-white/10">
                          <span className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">{d.month}</span>
                          <Badge variant="secondary" className="text-[10px]">
                            {d.year}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-1.5 text-slate-700 dark:text-slate-300">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400">GMV Faturado:</span>
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              {formatCurrency(d.revenue)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400">Volume de Pedidos:</span>
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              {formatNumber(d.orders)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400">Ticket Médio:</span>
                            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                              {formatCurrency(d.avgTicket)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400">Nota Média (NPS):</span>
                            <span className="font-bold text-amber-600 dark:text-amber-400">
                              {d.avgReview.toFixed(2)} / 5.0
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400">Pontualidade:</span>
                            <span className={`font-mono text-xs ${d.onTimeRate < 85 ? "text-rose-600 dark:text-rose-400 font-bold" : "text-slate-700 dark:text-slate-200"}`}>
                              {d.onTimeRate.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={metric}
                  stroke={currentConfig.color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#${currentConfig.gradientId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Destaque Analítico Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="liquid-card border-cyan-500/30 bg-cyan-500/5">
          <CardContent className="p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              <Lightbulb className="h-4 w-4" />
              Sazonalidade da Black Friday (Novembro)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Em Novembro de 2023, o faturamento atingiu <strong>R$ 1.485.000 (+68% em relação à média mensal)</strong> com 8.940 pedidos faturados. O ticket médio também cresceu para R$ 166,10 impulsionado por kits promocionais e vendas de produtos de informática.
            </p>
          </CardContent>
        </Card>

        <Card className="liquid-card border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              Impacto Logístico no NPS
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Durante o pico de Novembro, o lead time de entrega subiu de 11.8 para <strong>16.4 dias úteis</strong>, e a taxa de pontualidade caiu para <strong>82.3%</strong>. Como consequência direta, a nota média de avaliação sofreu queda de 4.15 para <strong>3.88</strong>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}