"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MapPin, Truck, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { STATES_DATA } from "@/data/ecommerce-dataset";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function GeographyTab() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const regions = useMemo(() => {
    const set = new Set(STATES_DATA.map((s) => s.region));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredStates = useMemo(() => {
    if (selectedRegion === "all") return STATES_DATA;
    return STATES_DATA.filter((s) => s.region === selectedRegion);
  }, [selectedRegion]);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Visão de Disparidade Regional de Logística */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="liquid-card border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Região Sudeste (SP / RJ / MG)
              </span>
              <Badge variant="success" className="text-[10px]">
                Hub Central
              </Badge>
            </div>
            <p className="text-2xl font-extrabold text-white tracking-tight">
              67,8% <span className="text-xs font-normal text-slate-400">do Volume Total</span>
            </p>
            <div className="flex flex-col gap-1 text-xs text-slate-300 mt-1 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-400">Frete Médio:</span>
                <span className="font-mono text-emerald-400 font-bold">R$ 17,80</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prazo Médio:</span>
                <span className="font-mono text-white">9,8 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-card border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                Região Sul (RS / PR / SC)
              </span>
              <Badge variant="blue" className="text-[10px]">
                Mercado Maduro
              </Badge>
            </div>
            <p className="text-2xl font-extrabold text-white tracking-tight">
              15,3% <span className="text-xs font-normal text-slate-400">do Volume Total</span>
            </p>
            <div className="flex flex-col gap-1 text-xs text-slate-300 mt-1 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-400">Frete Médio:</span>
                <span className="font-mono text-blue-300 font-bold">R$ 23,36</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prazo Médio:</span>
                <span className="font-mono text-white">13,3 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-card border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Norte & Nordeste & CO
              </span>
              <Badge variant="warning" className="text-[10px]">
                Gargalo & Oportunidade
              </Badge>
            </div>
            <p className="text-2xl font-extrabold text-white tracking-tight">
              16,9% <span className="text-xs font-normal text-slate-400">do Volume Total</span>
            </p>
            <div className="flex flex-col gap-1 text-xs text-slate-300 mt-1 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-400">Frete Médio:</span>
                <span className="font-mono text-amber-300 font-bold">R$ 34,16 (+92%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prazo Médio:</span>
                <span className="font-mono text-white">19,4 dias (+98%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Gráfico e Tabela de Estados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gráfico de Barras Horizontais dos Estados */}
        <Card className="liquid-card border-white/10 lg:col-span-6 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <MapPin className="h-4 w-4" />
                </span>
                <CardTitle className="text-base sm:text-lg">
                  Concentração por Estado (UF)
                </CardTitle>
              </div>
              <Badge variant="default" className="text-[10px]">
                SP = 42%
              </Badge>
            </div>
            <CardDescription>
              Volume de compras por unidade federativa, refletindo alta densidade no eixo Rio-São Paulo.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredStates}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="uf"
                    tick={{ fontSize: 10, fill: "#cbd5e1" }}
                    axisLine={false}
                    tickLine={false}
                    width={45}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl p-3.5 bg-slate-950/95 backdrop-blur-xl border border-white/20 text-xs shadow-2xl min-w-[200px]">
                          <p className="font-bold text-cyan-400 pb-1.5 mb-1.5 border-b border-white/10">
                            {d.state} ({d.uf})
                          </p>
                          <div className="flex flex-col gap-1 text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Pedidos:</span>
                              <strong className="text-white font-mono">{formatNumber(d.orders)} ({d.pct}%)</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">GMV:</span>
                              <strong className="text-emerald-400 font-mono">{formatCurrency(d.revenue)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Frete Médio:</span>
                              <strong className="text-cyan-300 font-mono">{formatCurrency(d.avgFreight)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Prazo Médio:</span>
                              <span className="text-slate-200">{d.avgDays.toFixed(1)} dias</span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="orders" radius={[0, 6, 6, 0]} maxBarSize={18} fill="#3b82f6">
                    {filteredStates.map((entry, index) => (
                      <Cell
                        key={`uf-cell-${index}`}
                        fill={entry.uf === "SP" ? "#06b6d4" : entry.region === "Sudeste" ? "#3b82f6" : "#6366f1"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Estados e Logística */}
        <Card className="liquid-card border-white/10 lg:col-span-6 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Truck className="h-4 w-4" />
                </span>
                <CardTitle className="text-base sm:text-lg">
                  Métricas de Frete & Lead Time
                </CardTitle>
              </div>

              {/* Filtro por Região */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-slate-900 border border-white/15 text-slate-200 text-xs rounded-lg px-2 py-1 outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="all">Todas as Regiões</option>
                {regions
                  .filter((r) => r !== "all")
                  .map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
            </div>
            <CardDescription>
              Comparativo de custo de frete e prazos médios de entrega por estado.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="max-h-[360px] overflow-y-auto pr-1">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-950/95 backdrop-blur-md z-10">
                  <TableRow>
                    <TableHead>Estado (UF)</TableHead>
                    <TableHead className="text-right">Pedidos</TableHead>
                    <TableHead className="text-right">Part.</TableHead>
                    <TableHead className="text-right">Frete Médio</TableHead>
                    <TableHead className="text-right">Prazo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStates.map((st) => (
                    <TableRow key={st.uf}>
                      <TableCell className="font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-cyan-400">{st.uf}</span>
                          <span className="text-xs text-slate-300 hidden sm:inline">{st.state}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-white">
                        {formatNumber(st.orders)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-400 text-[11px]">
                        {st.pct.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-mono text-emerald-400">
                        {formatCurrency(st.avgFreight)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-300">
                        {st.avgDays.toFixed(1)} d
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Oportunidade de Supply Chain */}
      <Card className="liquid-card border-cyan-500/20 bg-cyan-500/5">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-bold text-cyan-400 text-xs uppercase tracking-wider">
              <Compass className="h-4 w-4" />
              Oportunidade Estratégica: Fulfillment Hub no Nordeste
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Com frete médio de R$ 34,16 e 19,4 dias de trânsito no Nordeste, a implantação de um CD avançado (ex: Recife ou Salvador) para produtos de curva A reduziria o lead time para <strong>3 a 5 dias</strong>, cortando o abandono de carrinho em até <strong>38%</strong> e impulsionando as vendas regionais em <strong>+45%</strong>.
            </p>
          </div>
          <Badge variant="cyan" className="text-xs py-1.5 px-3 shrink-0">
            Impacto Alto no GMV
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
