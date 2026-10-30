"use client";

import React, { useState, useMemo } from "react";
import { BRAZIL_STATE_PATHS, BrazilStatePath } from "@/data/brazil-paths";
import { STATES_DATA } from "@/data/ecommerce-dataset";
import { StateMetric } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Layers, RotateCcw, Zap } from "lucide-react";

export type MapMetricType = "orders" | "freight" | "days";

interface BrazilMapProps {
  selectedUf: string | null;
  onSelectUf: (uf: string | null) => void;
}

// Hub nacional central (São Paulo - Capital/Região Metropolitana)
const SP_HUB = { x: 288, y: 328 };

// Destinos logísticos estratégicos a partir do hub SP (com curvatura calibrada)
const LOGISTICS_ROUTES = [
  { targetUf: "BA", label: "Rota Nordeste Sul (Salvador)", dest: { x: 362, y: 222 }, curvature: 25 },
  { targetUf: "PE", label: "Rota Nordeste Norte (Recife)", dest: { x: 396, y: 165 }, curvature: 35 },
  { targetUf: "CE", label: "Rota Ceará (Fortaleza)", dest: { x: 395, y: 126 }, curvature: 40 },
  { targetUf: "DF", label: "Rota Centro-Oeste (Brasília)", dest: { x: 301, y: 249 }, curvature: -15 },
  { targetUf: "GO", label: "Rota Goiás (Goiânia)", dest: { x: 270, y: 254 }, curvature: -22 },
  { targetUf: "MT", label: "Rota Centro-Norte (Cuiabá)", dest: { x: 206, y: 215 }, curvature: -35 },
  { targetUf: "PA", label: "Rota Norte Oriental (Belém)", dest: { x: 235, y: 110 }, curvature: -25 },
  { targetUf: "AM", label: "Corredor Amazônico (Manaus)", dest: { x: 104, y: 110 }, curvature: -50 },
  { targetUf: "PR", label: "Rota Sul (Curitiba)", dest: { x: 260, y: 356 }, curvature: -15 },
  { targetUf: "RS", label: "Rota Extremo Sul (Porto Alegre)", dest: { x: 233, y: 424 }, curvature: -28 },
  { targetUf: "MG", label: "Corredor Central (Belo Horizonte)", dest: { x: 326, y: 285 }, curvature: 12 },
  { targetUf: "RJ", label: "Ponte Sudeste (Rio de Janeiro)", dest: { x: 357, y: 328 }, curvature: 15 },
];

// Posições calibradas para as siglas de todas as 27 Unidades Federativas do Brasil
const STATE_LABEL_POSITIONS: Record<string, { x: number; y: number; size: number }> = {
  // Região Norte
  AM: { x: 104, y: 110, size: 10 },
  PA: { x: 235, y: 110, size: 10 },
  MT: { x: 206, y: 215, size: 10 },
  MS: { x: 226, y: 305, size: 9 },
  RO: { x: 130, y: 190, size: 8.5 },
  AC: { x: 44, y: 172, size: 8 },
  RR: { x: 140, y: 46, size: 8.5 },
  AP: { x: 249, y: 52, size: 8.5 },
  TO: { x: 304, y: 176, size: 8.5 },

  // Região Nordeste
  MA: { x: 330, y: 132, size: 9 },
  PI: { x: 305, y: 210, size: 8.5 },
  CE: { x: 395, y: 126, size: 8.5 },
  RN: { x: 426, y: 133, size: 7.5 },
  PB: { x: 426, y: 147, size: 7.5 },
  PE: { x: 396, y: 165, size: 8 },
  AL: { x: 428, y: 178, size: 7 },
  SE: { x: 418, y: 194, size: 7 },
  BA: { x: 362, y: 222, size: 10 },

  // Região Centro-Oeste
  GO: { x: 270, y: 254, size: 9 },
  DF: { x: 301, y: 249, size: 7.5 },

  // Região Sudeste
  MG: { x: 326, y: 285, size: 10 },
  ES: { x: 382, y: 295, size: 7.5 },
  RJ: { x: 357, y: 328, size: 8 },
  SP: { x: 288, y: 328, size: 10 },

  // Região Sul
  PR: { x: 260, y: 356, size: 9 },
  SC: { x: 265, y: 389, size: 8.5 },
  RS: { x: 233, y: 424, size: 9.5 },
};

export function BrazilMap({ selectedUf, onSelectUf }: BrazilMapProps) {
  const [activeMetric, setActiveMetric] = useState<MapMetricType>("orders");
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [hoveredUf, setHoveredUf] = useState<string | null>(null);

  // Mapear métricas por UF para acesso rápido O(1)
  const stateMetricsMap = useMemo(() => {
    const map = new Map<string, StateMetric>();
    STATES_DATA.forEach((s) => map.set(s.uf, s));
    return map;
  }, []);

  // Determinar cor de preenchimento para cada estado baseado na métrica ativa
  const getStateColor = (uf: string) => {
    const metric = stateMetricsMap.get(uf);
    if (!metric) return "#94a3b8";

    if (activeMetric === "orders") {
      // Volume de pedidos (SP tem 41.250, RJ 13.420, MG 11.840, etc.)
      if (metric.orders >= 30000) return "#06b6d4"; // Cyan vibrante para o Hub SP
      if (metric.orders >= 10000) return "#0284c7"; // Azul intenso RJ, MG
      if (metric.orders >= 5000) return "#2563eb"; // Azul royal RS, PR
      if (metric.orders >= 2000) return "#4f46e5"; // Índigo SC, BA, GO, DF, ES
      if (metric.orders >= 1000) return "#6366f1"; // Roxo azulado PE, CE
      if (metric.orders >= 500) return "#818cf8"; // Roxo suave MT, MS, MA, PB, RN, PI
      return "#a5b4fc"; // Restante
    }

    if (activeMetric === "freight") {
      // Custo de Frete Médio (SP R$ 15,40 até RR R$ 46,20)
      if (metric.avgFreight <= 18.0) return "#10b981"; // Verde esmeralda (Alta eficiência)
      if (metric.avgFreight <= 23.0) return "#34d399"; // Verde claro
      if (metric.avgFreight <= 27.0) return "#f59e0b"; // Âmbar / Alerta médio
      if (metric.avgFreight <= 35.0) return "#f97316"; // Laranja / Fricção
      return "#ef4444"; // Vermelho coral (Gargalo logístico crítico)
    }

    if (activeMetric === "days") {
      // Prazo de Entrega (SP 8.2 dias até RR 28.4 dias)
      if (metric.avgDays <= 10.0) return "#10b981"; // Ultrarrápido (< 10d)
      if (metric.avgDays <= 13.0) return "#0ea5e9"; // Eficiente (10d - 13d)
      if (metric.avgDays <= 16.0) return "#eab308"; // Médio (13d - 16d)
      if (metric.avgDays <= 21.0) return "#f97316"; // Crítico (16d - 21d)
      return "#ef4444"; // Severo (> 21d)
    }

    return "#94a3b8";
  };

  const hoveredData = hoveredUf ? stateMetricsMap.get(hoveredUf) : null;
  const currentHoveredPath = hoveredUf
    ? BRAZIL_STATE_PATHS.find((p) => p.uf === hoveredUf)
    : null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Controles de Métrica e Filtros da Camada */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200/80 dark:border-white/10">
        {/* Seletor de Métrica */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200 dark:border-white/10">
          <Button
            type="button"
            variant={activeMetric === "orders" ? "cyan" : "ghost"}
            size="sm"
            onClick={() => setActiveMetric("orders")}
            className="text-xs h-7 px-2.5 rounded-lg font-medium"
          >
            Volume (Pedidos)
          </Button>
          <Button
            type="button"
            variant={activeMetric === "freight" ? "cyan" : "ghost"}
            size="sm"
            onClick={() => setActiveMetric("freight")}
            className="text-xs h-7 px-2.5 rounded-lg font-medium"
          >
            Frete Médio (R$)
          </Button>
          <Button
            type="button"
            variant={activeMetric === "days" ? "cyan" : "ghost"}
            size="sm"
            onClick={() => setActiveMetric("days")}
            className="text-xs h-7 px-2.5 rounded-lg font-medium"
          >
            Lead Time (Dias)
          </Button>
        </div>

        {/* Toggle de Rotas Logísticas e Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRoutes(!showRoutes)}
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
              showRoutes
                ? "bg-amber-500/20 border-amber-500/50 text-amber-700 dark:text-amber-300 shadow-sm font-bold"
                : "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
            }`}
            title="Alternar exibição das rotas logísticas saindo de SP"
          >
            <Truck className="h-3.5 w-3.5 text-amber-500" />
            <span>Malha de Rotas {showRoutes ? "(12 Eixos)" : ""}</span>
          </button>

          {selectedUf && (
            <button
              type="button"
              onClick={() => onSelectUf(null)}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Limpar seleção de estado"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Ver Todos</span>
            </button>
          )}
        </div>
      </div>

      {/* Canvas SVG do Mapa do Brasil com Overlay Interativo */}
      <div className="relative w-full aspect-[450/470] max-h-[520px] bg-gradient-to-b from-slate-50/50 to-slate-100/60 dark:from-slate-950/60 dark:to-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
        {/* Marca d'água estilizada de coordenadas */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 dark:text-slate-600 pointer-events-none select-none flex items-center gap-1">
          <Layers className="h-3 w-3 text-cyan-500" />
          <span>BR_LOGISTICS_TELEMETRY // EPSG:4674</span>
        </div>

        <svg
          viewBox="0 0 450 470"
          className="w-full h-full max-h-[490px] drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradiente Laser de Alta Visibilidade para Rotas */}
            <linearGradient id="laserRouteGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
            </linearGradient>

            {/* Filtro de Brilho Neon para o Estado Ativo */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Camada de Estados (Paths Poligonais do IBGE) */}
          <g id="brazil-states" className="transition-all duration-200">
            {BRAZIL_STATE_PATHS.map((st) => {
              const isSelected = selectedUf === st.uf;
              const isHovered = hoveredUf === st.uf;
              const fillColor = getStateColor(st.uf);

              return (
                <path
                  key={st.uf}
                  id={`state-${st.uf}`}
                  d={st.d}
                  fill={fillColor}
                  fillOpacity={
                    selectedUf
                      ? isSelected
                        ? 1
                        : 0.3
                      : isHovered
                      ? 0.95
                      : showRoutes
                      ? 0.65
                      : 0.82
                  }
                  stroke={
                    isSelected
                      ? "#ffffff"
                      : isHovered
                      ? "#22d3ee"
                      : "rgba(255, 255, 255, 0.45)"
                  }
                  strokeWidth={isSelected ? 2.5 : isHovered ? 1.8 : 0.8}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-all duration-200 ease-out hover:opacity-100"
                  style={{
                    filter: isSelected
                      ? "drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))"
                      : isHovered
                      ? "drop-shadow(0 0 5px rgba(6, 182, 212, 0.5))"
                      : "none",
                  }}
                  onMouseEnter={() => setHoveredUf(st.uf)}
                  onMouseLeave={() => setHoveredUf(null)}
                  onClick={() => onSelectUf(selectedUf === st.uf ? null : st.uf)}
                >
                  <title>{`${st.name} (${st.uf})`}</title>
                </path>
              );
            })}
          </g>

          {/* 2. Camada de Arcos de Rotas Logísticas (Hub SP -> Principais Polos) */}
          {showRoutes && (
            <g id="logistics-routes" className="pointer-events-none transition-opacity duration-300">
              {LOGISTICS_ROUTES.map((route) => {
                const midX = (SP_HUB.x + route.dest.x) / 2 + route.curvature;
                const midY = (SP_HUB.y + route.dest.y) / 2 - Math.abs(route.curvature) * 0.35;
                const pathData = `M ${SP_HUB.x} ${SP_HUB.y} Q ${midX} ${midY} ${route.dest.x} ${route.dest.y}`;

                return (
                  <g key={`route-${route.targetUf}`} className="transition-all">
                    {/* Camada 1: Contorno escuro sólido para garantir contraste contra qualquer cor de fundo */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#020617"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeOpacity="0.85"
                    />

                    {/* Camada 2: Feixe laser neon âmbar-dourado vibrante */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="url(#laserRouteGradient)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      style={{ filter: "drop-shadow(0 0 3px rgba(245, 158, 11, 0.9))" }}
                    />

                    {/* Camada 3: Feixes de luz pulsantes em fluxo contínuo (hardware-accelerated SVG) */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeDasharray="6 14"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="40"
                        to="0"
                        dur="1.4s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Ponto de destino regional */}
                    <circle
                      cx={route.dest.x}
                      cy={route.dest.y}
                      r="3.2"
                      fill="#38bdf8"
                      stroke="#020617"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx={route.dest.x}
                      cy={route.dest.y}
                      r="5"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1"
                    >
                      <animate attributeName="r" values="3;7;3" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}

              {/* Hub Central Nacional em SP - Beacon Nativo no próprio local sem CSS transform */}
              <circle
                cx={SP_HUB.x}
                cy={SP_HUB.y}
                r="6"
                fill="#f59e0b"
                fillOpacity="0.4"
              >
                <animate attributeName="r" values="5;12;5" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.5;0.05;0.5" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={SP_HUB.x}
                cy={SP_HUB.y}
                r="4.5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.6"
                style={{ filter: "drop-shadow(0 0 5px rgba(245, 158, 11, 0.9))" }}
              />

              {/* Badge descritiva do Hub SP */}
              <g transform={`translate(${SP_HUB.x + 8}, ${SP_HUB.y - 12})`}>
                <rect
                  x="-2"
                  y="-9"
                  width="48"
                  height="15"
                  rx="4"
                  fill="#020617"
                  fillOpacity="0.92"
                  stroke="#f59e0b"
                  strokeWidth="1"
                />
                <text
                  x="22"
                  y="2"
                  textAnchor="middle"
                  fontSize="7.5"
                  fontWeight="900"
                  fill="#f59e0b"
                  className="font-mono tracking-wider"
                >
                  HUB SP
                </text>
              </g>
            </g>
          )}

          {/* 3. Camada de Siglas de Todas as 27 UFs para Orientação Espacial */}
          <g id="state-labels" className="pointer-events-none select-none">
            {BRAZIL_STATE_PATHS.map((st) => {
              const labelPos = STATE_LABEL_POSITIONS[st.uf] || {
                x: st.center.x,
                y: st.center.y,
                size: 8.5,
              };
              const isSelected = selectedUf === st.uf;
              const isHovered = hoveredUf === st.uf;

              return (
                <text
                  key={`label-${st.uf}`}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={isSelected || isHovered ? labelPos.size + 1.2 : labelPos.size}
                  fontWeight={isSelected || isHovered ? "900" : "800"}
                  fill={isSelected ? "#22d3ee" : isHovered ? "#ffffff" : "#ffffff"}
                  stroke={isSelected ? "#083344" : "#0f172a"}
                  strokeWidth={isSelected ? "1.8" : "1.4"}
                  paintOrder="stroke fill"
                  className="font-mono transition-all duration-150 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
                >
                  {st.uf}
                </text>
              );
            })}
          </g>
        </svg>

        {/* Tooltip Dinâmico Flutuante em Hover */}
        {hoveredData && currentHoveredPath && (
          <div
            className="absolute z-30 pointer-events-none rounded-xl p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 shadow-2xl text-xs flex flex-col gap-1 min-w-[190px] transition-all"
            style={{
              left: Math.min(Math.max(currentHoveredPath.center.x - 20, 10), 240),
              top: Math.max(currentHoveredPath.center.y - 85, 10),
            }}
          >
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200 dark:border-white/10">
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold">
                  {hoveredData.uf}
                </span>
                {hoveredData.state}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {hoveredData.region}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase">
                  Pedidos
                </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  {formatNumber(hoveredData.orders)}
                </span>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 ml-1 font-semibold">
                  ({hoveredData.pct.toFixed(1)}%)
                </span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase">
                  Frete Médio
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {formatCurrency(hoveredData.avgFreight)}
                </span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase">
                  Prazo de Entrega
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {hoveredData.avgDays.toFixed(1)} dias
                </span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase">
                  Receita (GMV)
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                  {formatCurrency(hoveredData.revenue)}
                </span>
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-slate-100 dark:border-white/5 text-[9px] text-slate-500 dark:text-slate-400 italic text-center">
              Clique para travar a telemetria deste estado
            </div>
          </div>
        )}

        {/* Legenda de Cor do Mapa (Régua Gradiente) */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-[10px] shadow-sm flex flex-col gap-1.5 z-10">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 font-semibold text-[10px]">
            <span>
              {activeMetric === "orders" && "Volume de Pedidos"}
              {activeMetric === "freight" && "Frete Médio (R$)"}
              {activeMetric === "days" && "Lead Time Médio (Dias)"}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[9px] font-normal">
              {activeMetric === "orders" && "Menor (47) → Maior (41.250)"}
              {activeMetric === "freight" && "R$ 15,40 (SP) → R$ 46,20 (RR)"}
              {activeMetric === "days" && "8,2 dias (SP) → 28,4 dias (RR)"}
            </span>
          </div>

          {/* Barra de Gradiente Contínuo */}
          <div className="h-2 w-full sm:w-56 rounded-full overflow-hidden flex">
            {activeMetric === "orders" && (
              <>
                <div className="flex-1 bg-[#a5b4fc]" />
                <div className="flex-1 bg-[#818cf8]" />
                <div className="flex-1 bg-[#6366f1]" />
                <div className="flex-1 bg-[#2563eb]" />
                <div className="flex-1 bg-[#0284c7]" />
                <div className="flex-1 bg-[#06b6d4]" />
              </>
            )}
            {activeMetric === "freight" && (
              <>
                <div className="flex-1 bg-[#10b981]" />
                <div className="flex-1 bg-[#34d399]" />
                <div className="flex-1 bg-[#f59e0b]" />
                <div className="flex-1 bg-[#f97316]" />
                <div className="flex-1 bg-[#ef4444]" />
              </>
            )}
            {activeMetric === "days" && (
              <>
                <div className="flex-1 bg-[#10b981]" />
                <div className="flex-1 bg-[#0ea5e9]" />
                <div className="flex-1 bg-[#eab308]" />
                <div className="flex-1 bg-[#f97316]" />
                <div className="flex-1 bg-[#ef4444]" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

