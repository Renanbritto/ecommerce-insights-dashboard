"use client";

import React from "react";
import { Package, DollarSign, TrendingUp, ThumbsUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GLOBAL_KPI_SUMMARY } from "@/data/ecommerce-dataset";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function HeaderStats() {
  const kpis = GLOBAL_KPI_SUMMARY;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Volume de Pedidos */}
      <Card className="liquid-card relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/15 transition-colors" />
        <CardContent className="p-5 flex flex-col justify-between h-full gap-2">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
              <Package className="h-4 w-4" />
            </span>
            <Badge variant="default" className="text-[10px] font-semibold">
              24 Meses
            </Badge>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Volume de Pedidos
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
              {formatNumber(kpis.totalOrders)}
            </p>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">100%</span> registros consolidados e deduplicados
          </p>
        </CardContent>
      </Card>

      {/* 2. GMV Total */}
      <Card className="liquid-card relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/15 transition-colors" />
        <CardContent className="p-5 flex flex-col justify-between h-full gap-2">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </span>
            <Badge variant="success" className="text-[10px] font-semibold">
              +32.4% YoY
            </Badge>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              GMV Total Transacionado
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
              {formatCurrency(kpis.totalGmv, true)}
            </p>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="h-3 w-3" /> Pico recorde na Black Friday (R$ 1,48 M)
          </p>
        </CardContent>
      </Card>

      {/* 3. Ticket Médio vs Mediana */}
      <Card className="liquid-card relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none group-hover:bg-blue-500/15 transition-colors" />
        <CardContent className="p-5 flex flex-col justify-between h-full gap-2">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400">
              <TrendingUp className="h-4 w-4" />
            </span>
            <Badge variant="blue" className="text-[10px] font-semibold">
              P50: R$ 98,50
            </Badge>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ticket Médio vs Mediana
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
              {formatCurrency(kpis.avgTicket)}
            </p>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Cauda longa: 78.2% dos pedidos abaixo de R$ 200
          </p>
        </CardContent>
      </Card>

      {/* 4. NPS e Satisfação */}
      <Card className="liquid-card relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:bg-amber-500/15 transition-colors" />
        <CardContent className="p-5 flex flex-col justify-between h-full gap-2">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <ThumbsUp className="h-4 w-4" />
            </span>
            <Badge variant="warning" className="text-[10px] font-semibold">
              76.8% Nota 5.0
            </Badge>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Satisfação Média (NPS)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
              {kpis.avgReviewScore.toFixed(2)}{" "}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ 5.0</span>
            </p>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="h-3 w-3 text-cyan-600 dark:text-cyan-400" /> Prazo médio nacional: 12.4 dias
          </p>
        </CardContent>
      </Card>
    </div>
  );
}