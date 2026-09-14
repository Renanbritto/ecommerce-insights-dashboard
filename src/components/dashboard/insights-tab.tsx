"use client";

import React from "react";
import { Lightbulb, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXECUTIVE_INSIGHTS } from "@/data/ecommerce-dataset";

export function InsightsTab() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="liquid-card border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Target className="h-4 w-4" />
              </span>
              <CardTitle className="text-base sm:text-lg">
                Matriz Estratégica & Plano de Ação Executivo
              </CardTitle>
            </div>
            <Badge variant="cyan" className="text-[10px]">
              Data-Driven Decisions
            </Badge>
          </div>
          <CardDescription>
            Recomendações prioritárias derivadas do diagnóstico exploratório (EDA) para otimização de margens, logística e NPS.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXECUTIVE_INSIGHTS.map((item) => {
              const isCrit = item.impact === "Crítico";
              const isHigh = item.impact === "Alto";

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 flex flex-col justify-between gap-3 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px]">
                        {item.category}
                      </Badge>
                      <Badge
                        variant={isCrit ? "destructive" : isHigh ? "cyan" : "warning"}
                        className="text-[10px]"
                      >
                        Impacto {item.impact}
                      </Badge>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>

                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{item.impactMetric}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-3 border-t border-white/5 text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                        Ação Proposta:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {item.action}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 bg-cyan-500/5 p-2.5 rounded-xl border border-cyan-500/15">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb className="h-3 w-3 text-cyan-400" />
                        Recomendação de Negócio:
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
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
