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
import { Package, ArrowUpDown } from "lucide-react";
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
import { CATEGORIES_DATA } from "@/data/ecommerce-dataset";
import { CategoryMetric } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function CategoriesTab() {
  const [sortBy, setSortBy] = useState<"revenue" | "orders" | "avgTicket" | "avgReview">("revenue");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const departments = useMemo(() => {
    const set = new Set(CATEGORIES_DATA.map((c) => c.department));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredCategories = useMemo(() => {
    let list = [...CATEGORIES_DATA];
    if (selectedDepartment !== "all") {
      list = list.filter((c) => c.department === selectedDepartment);
    }
    return list.sort((a, b) => b[sortBy] - a[sortBy]);
  }, [sortBy, selectedDepartment]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gráfico de Barras Horizontais */}
        <Card className="liquid-card lg:col-span-6 flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-200/70 dark:border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Package className="h-4 w-4" />
                </span>
                <CardTitle className="text-base sm:text-lg">
                  Top Departamentos por GMV
                </CardTitle>
              </div>
              <Badge variant="success" className="text-[10px] font-semibold">
                Volume Financeiro
              </Badge>
            </div>
            <CardDescription>
              Distribuição do faturamento bruto consolidado entre os principais segmentos de mercado.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredCategories.slice(0, 8)}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    width={130}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload as CategoryMetric;
                      return (
                        <div className="rounded-xl p-3.5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/20 text-xs shadow-2xl min-w-[200px]">
                          <p className="font-bold text-emerald-600 dark:text-emerald-400 pb-1.5 mb-1.5 border-b border-slate-200 dark:border-white/10">
                            {d.name}
                          </p>
                          <div className="flex flex-col gap-1 text-slate-700 dark:text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">GMV:</span>
                              <strong className="text-slate-900 dark:text-white font-mono">{formatCurrency(d.revenue)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Pedidos:</span>
                              <strong className="text-slate-900 dark:text-white font-mono">{formatNumber(d.orders)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Ticket Médio:</span>
                              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{formatCurrency(d.avgTicket)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">NPS:</span>
                              <span className="font-bold text-amber-600 dark:text-amber-400">{d.avgReview.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
                    {filteredCategories.slice(0, 8).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#10b981" : index < 3 ? "#06b6d4" : "#3b82f6"}
                        fillOpacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tabela Interativa de Categorias */}
        <Card className="liquid-card lg:col-span-6 flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-200/70 dark:border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <ArrowUpDown className="h-4 w-4" />
                </span>
                <CardTitle className="text-base">Métricas por Segmento</CardTitle>
              </div>

              {/* Filtros da Tabela */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-2 py-1 outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
                  title="Ordenar por"
                >
                  <option value="revenue">Ordenar: Receita</option>
                  <option value="orders">Ordenar: Pedidos</option>
                  <option value="avgTicket">Ordenar: Ticket</option>
                  <option value="avgReview">Ordenar: NPS</option>
                </select>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-2 py-1 outline-none focus:border-cyan-500 cursor-pointer shadow-2xs"
                  title="Filtrar setor"
                >
                  <option value="all">Todos os Setores</option>
                  {departments
                    .filter((d) => d !== "all")
                    .map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <CardDescription>
              Comparativo de ticket médio, prazo de logística e taxa de satisfação por categoria.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="max-h-[380px] overflow-y-auto pr-1">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-100/95 dark:bg-slate-950/95 backdrop-blur-md z-10">
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right">Ticket</TableHead>
                    <TableHead className="text-right">Prazo</TableHead>
                    <TableHead className="text-right">NPS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-semibold text-slate-900 dark:text-white">
                        <div className="flex flex-col">
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                            {cat.department}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {formatCurrency(cat.revenue, true)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300">
                        {formatCurrency(cat.avgTicket)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                        {cat.deliveryDays.toFixed(1)} d
                      </TableCell>
                      <TableCell className="text-right font-bold text-amber-600 dark:text-amber-400">
                        {cat.avgReview.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Destaques Comparativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex flex-col gap-1.5">
          <span className="font-bold text-cyan-800 dark:text-cyan-400 uppercase text-[10px] tracking-wider">
            Líder em GMV: Informática & PCs
          </span>
          <p className="text-slate-700 dark:text-slate-300">
            Faturamento de <strong>R$ 2.180.000</strong> impulsionado pelo segundo maior ticket médio (R$ 200,18).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col gap-1.5">
          <span className="font-bold text-emerald-800 dark:text-emerald-400 uppercase text-[10px] tracking-wider">
            Líder em Volume: Beleza & Saúde
          </span>
          <p className="text-slate-700 dark:text-slate-300">
            Maior número de pedidos (<strong>12.450</strong>) com entrega rápida (10.4 dias) e alto índice de aprovação (nota 4.22).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 flex flex-col gap-1.5">
          <span className="font-bold text-rose-800 dark:text-rose-400 uppercase text-[10px] tracking-wider">
            Alerta Crítico: Móveis & Decoração
          </span>
          <p className="text-slate-700 dark:text-slate-300">
            Menor NPS do estudo (<strong>3.86</strong>) e maior lead time (<strong>16.5 dias</strong>) decorrente de frete fracionado volumoso.
          </p>
        </div>
      </div>
    </div>
  );
}