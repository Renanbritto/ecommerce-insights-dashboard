"use client";

import React from "react";
import { Lightbulb, Target, TrendingUp, CheckCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXECUTIVE_INSIGHTS } from "@/data/ecommerce-dataset";

export function InsightsTab() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="liquid-card">
        <CardHeader className="pb-4 border-b border-slate-200/70 dark:border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                <Target className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Matriz Estratégica & Plano de Ação Executivo
                </CardTitle>
                <CardDescription className="mt-0.5">
                  Recomendações prioritárias derivadas do diagnóstico exploratório (EDA) para otimização de margens, logística e NPS.
                </CardDescription>
              </div>
            </div>
            <Badge variant="cyan" className="text-[10px] font-semibold">
              Data-Driven Decisions
            </Badge>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 mt-2">
            <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Logística NE
              </span>
              <span className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">
                -65% Lead Time
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Black Friday
              </span>
              <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 font-mono mt-0.5">
                +0.26 NPS SLA
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Logística Reversa
              </span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                R$ 180k / ano
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Ciclo Pix
              </span>
              <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                -48h Custódia
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {EXECUTIVE_INSIGHTS.map((item) => {
              const isCrit = item.impact === "Crítico";
              const isHigh = item.impact === "Alto";

              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md hover:border-cyan-500/40 dark:hover:border-cyan-500/30 flex flex-col justify-between gap-4 transition-all group"
                >
                  <div className="flex flex-col gap-3">
                    {/* Tags row */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="text-[10px] font-semibold">
                        {item.category}
                      </Badge>
                      <Badge
                        variant={isCrit ? "destructive" : isHigh ? "cyan" : "warning"}
                        className="text-[10px] font-bold"
                      >
                        Impacto {item.impact}
                      </Badge>
                    </div>

                    {/* Card Title */}
                    <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors tracking-tight">
                      {item.title}
                    </h4>

                    {/* Impact Metric Pill */}
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center gap-2 font-bold shadow-2xs">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item.impactMetric}</span>
                    </div>

                    {/* Problem / Context */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions & Business Recommendations */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-white/5 text-xs">
                    {/* Ação Proposta */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-white/5">
                      <span className="text-[10px] font-extrabold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="h-3 w-3" />
                        Ação Proposta:
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-medium">
                        {item.action}
                      </p>
                    </div>

                    {/* Recomendação de Negócio */}
                    <div className="flex flex-col gap-1.5 bg-cyan-50/70 dark:bg-cyan-500/5 p-3 rounded-xl border border-cyan-200/80 dark:border-cyan-500/20">
                      <span className="text-[10px] font-extrabold text-cyan-900 dark:text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                        Recomendação de Negócio:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                        {item.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}