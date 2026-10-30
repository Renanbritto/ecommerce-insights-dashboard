"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet, FileJson, CheckCircle2 } from "lucide-react";
import {
  MONTHLY_TRENDS,
  CATEGORIES_DATA,
  STATES_DATA,
  PAYMENT_METHODS_DATA,
  HISTOGRAM_DATA,
} from "@/data/ecommerce-dataset";
import { exportToCsv, exportToJson } from "@/lib/export-utils";

type DatasetType = "monthly" | "categories" | "states" | "payments" | "histogram";

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const [selectedDataset, setSelectedDataset] = useState<DatasetType>("monthly");
  const [exported, setExported] = useState(false);

  const handleExportCsv = () => {
    switch (selectedDataset) {
      case "monthly":
        exportToCsv("series_temporais_ecommerce_olist", MONTHLY_TRENDS, [
          { key: "month", label: "Mês" },
          { key: "year", label: "Ano" },
          { key: "orders", label: "Pedidos" },
          { key: "revenue", label: "Receita (R$)" },
          { key: "avgTicket", label: "Ticket Médio (R$)" },
          { key: "avgReview", label: "NPS Avaliação" },
          { key: "avgDeliveryDays", label: "Prazo Médio (Dias)" },
          { key: "onTimeRate", label: "Taxa Pontualidade (%)" },
        ]);
        break;
      case "categories":
        exportToCsv("categorias_ecommerce_olist", CATEGORIES_DATA, [
          { key: "name", label: "Categoria" },
          { key: "department", label: "Departamento" },
          { key: "orders", label: "Pedidos" },
          { key: "revenue", label: "Receita (R$)" },
          { key: "avgTicket", label: "Ticket Médio (R$)" },
          { key: "avgReview", label: "NPS Avaliação" },
          { key: "deliveryDays", label: "Prazo de Entrega (Dias)" },
          { key: "avgFreight", label: "Frete Médio (R$)" },
        ]);
        break;
      case "states":
        exportToCsv("geografia_estados_ecommerce_olist", STATES_DATA, [
          { key: "uf", label: "UF" },
          { key: "state", label: "Estado" },
          { key: "region", label: "Região" },
          { key: "orders", label: "Pedidos" },
          { key: "pct", label: "Participação (%)" },
          { key: "revenue", label: "Receita (R$)" },
          { key: "avgFreight", label: "Frete Médio (R$)" },
          { key: "avgDays", label: "Prazo Médio (Dias)" },
        ]);
        break;
      case "payments":
        exportToCsv("meios_pagamento_ecommerce_olist", PAYMENT_METHODS_DATA, [
          { key: "method", label: "Método de Pagamento" },
          { key: "share", label: "Participação (%)" },
          { key: "orders", label: "Pedidos" },
          { key: "revenue", label: "Receita (R$)" },
          { key: "avgInstallments", label: "Parcelas Médias" },
          { key: "avgTicket", label: "Ticket Médio (R$)" },
        ]);
        break;
      case "histogram":
        exportToCsv("distribuicao_tickets_ecommerce_olist", HISTOGRAM_DATA, [
          { key: "range", label: "Faixa de Valor" },
          { key: "count", label: "Quantidade Pedidos" },
          { key: "pct", label: "Percentual (%)" },
        ]);
        break;
    }
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const handleExportJson = () => {
    let dataToExport: unknown = MONTHLY_TRENDS;
    if (selectedDataset === "categories") dataToExport = CATEGORIES_DATA;
    if (selectedDataset === "states") dataToExport = STATES_DATA;
    if (selectedDataset === "payments") dataToExport = PAYMENT_METHODS_DATA;
    if (selectedDataset === "histogram") dataToExport = HISTOGRAM_DATA;

    exportToJson(`ecommerce_${selectedDataset}_dataset`, dataToExport);
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Download className="h-4 w-4" />
            </span>
            <DialogTitle>Exportar Dados Analíticos</DialogTitle>
          </div>
          <DialogDescription>
            Faça download dos dados exploratórios tratados em formato CSV (compatível com Excel) ou JSON para uso em Python, R ou BI.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-3">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Selecione o conjunto de dados:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: "monthly" as const, title: "Séries Temporais (24 Meses)", sub: "98k pedidos, GMV, Ticket e NPS mensal" },
              { id: "categories" as const, title: "Top Categorias & Departamentos", sub: "Receita, ticket, prazo de entrega e notas" },
              { id: "states" as const, title: "Distribuição Geográfica (UFs)", sub: "Volume por estado, frete médio e lead time" },
              { id: "payments" as const, title: "Meios de Pagamento", sub: "Split de cartões, parcelamento, boleto e Pix" },
              { id: "histogram" as const, title: "Distribuição Estatística (Ticket)", sub: "Histograma de frequências e cauda longa" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedDataset(item.id)}
                className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                  selectedDataset === item.id
                    ? "bg-cyan-500/15 border-cyan-500/40 text-slate-900 dark:text-white shadow-xs"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.sub}</p>
                </div>
                {selectedDataset === item.id && (
                  <Badge variant="default" className="text-[10px] font-semibold">
                    Selecionado
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {exported && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 p-2.5 rounded-xl font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Download iniciado com sucesso! Arquivo gerado em UTF-8.</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleExportCsv}
            className="w-full sm:w-auto flex items-center gap-2 border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Button
            variant="cyan"
            onClick={handleExportJson}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <FileJson className="h-4 w-4" />
            Exportar JSON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}