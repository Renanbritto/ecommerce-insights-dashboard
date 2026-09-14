import React from "react";
import Link from "next/link";
import { BarChart3, Github, ExternalLink, Heart, Database, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/70 mt-16 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="h-6 w-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <BarChart3 className="h-3.5 w-3.5" />
            </span>
            <span className="font-bold text-slate-200">E-Commerce Insights Platform</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-md">
            Desenvolvido com Next.js 16, TypeScript, Tailwind CSS, Shadcn UI e Recharts.
            Estudo estatístico e exploratório (EDA) fundamentado no Brazilian E-Commerce Public Dataset da Olist no Kaggle.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <div className="flex items-center gap-1 text-slate-400">
            <Database className="h-3.5 w-3.5 text-cyan-400" />
            <span>98.247 Pedidos Processados</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Código Aberto (MIT)</span>
          </div>
          <span className="text-white/20">•</span>
          <Link
            href="https://github.com/Renanbritto/ecommerce-insights-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <Github className="h-3.5 w-3.5" />
            Repositório GitHub
          </Link>
          <span className="text-white/20">•</span>
          <Link
            href="https://renan-nocelli.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>Renan Nocelli Britto</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
