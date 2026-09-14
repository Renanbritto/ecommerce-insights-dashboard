"use client";

import React from "react";
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
import { CreditCard, Wallet, Banknote, Receipt, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_METHODS_DATA } from "@/data/ecommerce-dataset";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function PaymentsTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Cards de Resumo por Método */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PAYMENT_METHODS_DATA.map((pm) => (
          <Card key={pm.method} className="liquid-card border-white/10">
            <CardContent className="p-5 flex flex-col justify-between h-full gap-2">
              <div className="flex items-center justify-between">
                <span
                  className="h-8 w-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${pm.color}20`, color: pm.color }}
                >
                  {pm.method.includes("Cartão") ? (
                    <CreditCard className="h-4 w-4" />
                  ) : pm.method.includes("Boleto") ? (
                    <Receipt className="h-4 w-4" />
                  ) : pm.method.includes("Pix") ? (
                    <Banknote className="h-4 w-4" />
                  ) : (
                    <Wallet className="h-4 w-4" />
                  )}
                </span>
                <span className="text-xs font-bold font-mono text-slate-300">
                  {pm.share}%
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">{pm.method}</p>
                <p className="text-xl font-extrabold text-white mt-1">
                  {formatCurrency(pm.revenue, true)}
                </p>
              </div>
              <div className="flex flex-col gap-1 text-[11px] text-slate-400 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Volume:</span>
                  <span className="text-white font-mono">{formatNumber(pm.orders)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Médio:</span>
                  <span className="text-cyan-400 font-mono">{formatCurrency(pm.avgTicket)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parcelas Médias:</span>
                  <span className="text-slate-200 font-mono">{pm.avgInstallments}x</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Gráfico e Insights de Conversão */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gráfico de Barras de Participação */}
        <Card className="liquid-card border-white/10 lg:col-span-7 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <CreditCard className="h-4 w-4" />
                </span>
                <CardTitle className="text-base sm:text-lg">
                  Participação no Faturamento (GMV)
                </CardTitle>
              </div>
              <Badge variant="cyan" className="text-[10px]">
                Mix de Pagamentos
              </Badge>
            </div>
            <CardDescription>
              Volume financeiro transacionado por modalidade de pagamento na plataforma.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={PAYMENT_METHODS_DATA}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`}
                  />
                  <YAxis
                    type="category"
                    dataKey="method"
                    tick={{ fontSize: 10, fill: "#cbd5e1" }}
                    axisLine={false}
                    tickLine={false}
                    width={130}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl p-3 bg-slate-950/95 backdrop-blur-xl border border-white/20 text-xs shadow-2xl min-w-[180px]">
                          <p className="font-bold text-cyan-400 pb-1 mb-1 border-b border-white/10">
                            {d.method}
                          </p>
                          <div className="flex flex-col gap-1 text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-slate-400">GMV:</span>
                              <strong className="text-white font-mono">{formatCurrency(d.revenue)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Participação:</span>
                              <strong className="text-cyan-300 font-mono">{d.share}%</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Parcelamento:</span>
                              <span className="text-slate-200 font-mono">{d.avgInstallments} parcelas</span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="revenue" radius={[0, 6, 6, 0]} maxBarSize={22}>
                    {PAYMENT_METHODS_DATA.map((entry, index) => (
                      <Cell key={`pay-cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Diagnóstico Financeiro & Estratégia de Pagamento */}
        <Card className="liquid-card border-white/10 lg:col-span-5 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Percent className="h-4 w-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">
                Comportamento de Parcelamento
              </CardTitle>
            </div>
            <CardDescription>
              Impacto do parcelamento no ticket médio e ciclo financeiro da operação.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col gap-1">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-cyan-400" />
                Alavancagem no Cartão de Crédito
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Compras parceladas em 3x a 10x aumentam o ticket médio em <strong>+22,8% (R$ 155,02 vs R$ 126,24 no Pix)</strong>, viabilizando a aquisição de categorias premium como Relógios e Informática.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col gap-1">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Receipt className="h-3.5 w-3.5 text-amber-400" />
                Custo de Oportunidade do Boleto
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                O boleto responde por <strong>19,4% dos pedidos</strong>, mas gera retenção média de estoque por até <strong>3 dias úteis</strong> antes da compensação bancária, com taxa de desistência de 14,2%.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
