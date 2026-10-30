"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Sigma, Activity, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HISTOGRAM_DATA,
  SCATTER_DELIVERY_REVIEW,
  STATS_SUMMARY,
} from "@/data/ecommerce-dataset";
import { formatNumber } from "@/lib/utils";

export function DistributionTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Sumário de Estatística Descritiva (6 Cards) */}
      <Card className="liquid-card">
        <CardHeader className="pb-3 border-b border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Sigma className="h-4 w-4" />
            </span>
            <CardTitle className="text-base sm:text-lg">
              Estatística Descritiva & Diagnóstico do Dataset
            </CardTitle>
          </div>
          <CardDescription>
            Parâmetros estatísticos fundamentais calculados sobre os 98.247 pedidos da base Olist.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {STATS_SUMMARY.map((st, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 flex flex-col gap-1 hover:border-cyan-500/40 dark:hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    {st.label}
                  </span>
                  {st.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-mono font-semibold">
                      {st.badge}
                    </span>
                  )}
                </div>
                <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {st.value}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {st.desc}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2. Gráficos: Histograma e Dispersão Correlação */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Histograma de Ticket Médio (Cauda Longa) */}
        <Card className="liquid-card lg:col-span-6 flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-200/70 dark:border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <BarChart2 className="h-4 w-4" />
                </span>
                <CardTitle className="text-base">
                  Distribuição de Frequência (Histograma)
                </CardTitle>
              </div>
              <Badge variant="blue" className="text-[10px] font-semibold">
                Right-Skewed
              </Badge>
            </div>
            <CardDescription>
              Frequência de compras por faixa de preço. Evidencia a discrepância entre Média (R$ 150,72) e Mediana (R$ 98,50).
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={HISTOGRAM_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl p-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/20 text-xs shadow-2xl min-w-[170px]">
                          <p className="font-bold text-cyan-600 dark:text-cyan-400 pb-1 mb-1 border-b border-slate-200 dark:border-white/10">
                            Faixa {d.range}
                          </p>
                          <div className="flex flex-col gap-1 text-slate-700 dark:text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Pedidos:</span>
                              <strong className="text-slate-900 dark:text-white font-mono">
                                {formatNumber(d.count)}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Representatividade:</span>
                              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                                {d.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {HISTOGRAM_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#06b6d4" : index < 3 ? "#3b82f6" : "#6366f1"}
                        fillOpacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
              💡 <strong>Insight Estatístico:</strong> Apenas 1,3% dos pedidos superam R$ 1.000, gerando forte cauda longa e puxando a média para cima em +53% em relação à mediana.
            </p>
          </CardContent>
        </Card>

        {/* Correlação: Prazo de Entrega vs Avaliação */}
        <Card className="liquid-card lg:col-span-6 flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-200/70 dark:border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <Activity className="h-4 w-4" />
                </span>
                <CardTitle className="text-base">
                  Prazo de Entrega vs Nota de Avaliação
                </CardTitle>
              </div>
              <Badge variant="destructive" className="text-[10px] font-semibold">
                r = -0.78 (Forte)
              </Badge>
            </div>
            <CardDescription>
              Correlação inversa de Pearson: a degradação da satisfação acelera após o 15º dia de trânsito.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={SCATTER_DELIVERY_REVIEW}
                  margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                  <XAxis
                    dataKey="days"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
                    tickLine={false}
                    unit=" d"
                  />
                  <YAxis
                    domain={[1.0, 5.0]}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl p-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/20 text-xs shadow-2xl min-w-[190px]">
                          <p className="font-bold text-rose-600 dark:text-rose-400 pb-1 mb-1 border-b border-slate-200 dark:border-white/10">
                            {d.days} dias corridos
                          </p>
                          <div className="flex flex-col gap-1 text-slate-700 dark:text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Nota Média:</span>
                              <strong className="text-amber-600 dark:text-amber-400">{d.review.toFixed(2)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Status Operacional:</span>
                              <span className="font-mono text-slate-900 dark:text-white text-[11px] font-semibold">{d.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Aprovação (≥4.0):</span>
                              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{d.satisfactionPct}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="review"
                    stroke="#f43f5e"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#f43f5e", strokeWidth: 1.5, stroke: "#ffffff" }}
                    activeDot={{ r: 6, fill: "#ffffff", stroke: "#f43f5e", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
              💡 <strong>Ponto de Inflexão Crítico:</strong> Entregas até 12 dias mantêm NPS médio acima de 4,2. A partir de 18 dias, o NPS desaba para 3,72 e chega a 1,22 em prazos superiores a 35 dias.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}