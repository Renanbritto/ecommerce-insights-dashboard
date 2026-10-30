// Tipagens TypeScript para o E-Commerce Insights Dashboard

export interface MonthlyTrend {
  month: string;
  year: number;
  orders: number;
  revenue: number;
  avgTicket: number;
  avgReview: number;
  avgDeliveryDays: number;
  onTimeRate: number;
}

export interface CategoryMetric {
  id: string;
  name: string;
  department: string;
  orders: number;
  revenue: number;
  avgTicket: number;
  avgReview: number;
  deliveryDays: number;
  avgFreight: number;
  growthYoY: number;
}

export interface HistogramBucket {
  range: string;
  min: number;
  max: number;
  count: number;
  pct?: number;
  percentage?: number;
  color?: string;
}

export interface StateMetric {
  uf: string;
  state: string;
  region: "Sudeste" | "Sul" | "Nordeste" | "Centro-Oeste" | "Norte" | "Demais Regiões";
  orders: number;
  pct: number;
  avgFreight: number;
  avgDays: number;
  revenue: number;
}

export interface ScatterDeliveryReview {
  days: number;
  review: number;
  orders: number;
  category:
    | "Entrega Flash"
    | "Dentro do Prazo"
    | "Normal"
    | "Alerta Atraso"
    | "Atraso Crítico"
    | "Atraso Severo"
    | "Ultra Rápido"
    | "No Prazo"
    | "Alerta Moderado"
    | "Severo";
  satisfactionPct: number;
}

export interface StatSummary {
  label: string;
  value: string;
  desc: string;
  category: "ticket" | "delivery" | "correlation" | "volume";
  badge?: string;
}

export interface PaymentMethodMetric {
  method: string;
  share: number;
  orders: number;
  revenue: number;
  avgInstallments: number;
  avgTicket: number;
  color: string;
}

export interface ExecutiveInsight {
  id: string;
  title: string;
  category: "Logística" | "Sazonalidade" | "Comercial" | "Experiência do Cliente";
  impact: "Alto" | "Médio" | "Crítico";
  impactMetric: string;
  description: string;
  action: string;
  recommendation: string;
}

export interface GlobalKpiSummary {
  totalOrders: number;
  totalGmv: number;
  avgTicket: number;
  medianTicket: number;
  avgReviewScore: number;
  avgDeliveryDays: number;
  onTimeDeliveryRate: number;
  fiveStarPercentage: number;
}

export type MetricViewType = "revenue" | "orders" | "avgTicket" | "avgReview";
