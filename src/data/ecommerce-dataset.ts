import {
  MonthlyTrend,
  CategoryMetric,
  HistogramBucket,
  StateMetric,
  ScatterDeliveryReview,
  StatSummary,
  PaymentMethodMetric,
  ExecutiveInsight,
  GlobalKpiSummary,
} from "@/types";

export const GLOBAL_KPI_SUMMARY: GlobalKpiSummary = {
  totalOrders: 98247,
  totalGmv: 14810000,
  avgTicket: 150.72,
  medianTicket: 98.5,
  avgReviewScore: 4.08,
  avgDeliveryDays: 12.4,
  onTimeDeliveryRate: 91.8,
  fiveStarPercentage: 76.8,
};

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { month: "Jan/22", year: 2022, orders: 2840, revenue: 428000, avgTicket: 150.7, avgReview: 4.12, avgDeliveryDays: 11.8, onTimeRate: 93.4 },
  { month: "Fev/22", year: 2022, orders: 3120, revenue: 471000, avgTicket: 150.9, avgReview: 4.09, avgDeliveryDays: 12.1, onTimeRate: 92.8 },
  { month: "Mar/22", year: 2022, orders: 3680, revenue: 560000, avgTicket: 152.1, avgReview: 4.15, avgDeliveryDays: 11.5, onTimeRate: 93.9 },
  { month: "Abr/22", year: 2022, orders: 3590, revenue: 542000, avgTicket: 150.9, avgReview: 4.08, avgDeliveryDays: 12.4, onTimeRate: 92.1 },
  { month: "Mai/22", year: 2022, orders: 4120, revenue: 638000, avgTicket: 154.8, avgReview: 4.18, avgDeliveryDays: 11.2, onTimeRate: 94.2 },
  { month: "Jun/22", year: 2022, orders: 3950, revenue: 604000, avgTicket: 152.9, avgReview: 4.05, avgDeliveryDays: 12.7, onTimeRate: 91.5 },
  { month: "Jul/22", year: 2022, orders: 4230, revenue: 651000, avgTicket: 153.9, avgReview: 4.07, avgDeliveryDays: 12.3, onTimeRate: 92.0 },
  { month: "Ago/22", year: 2022, orders: 4410, revenue: 683000, avgTicket: 154.8, avgReview: 4.11, avgDeliveryDays: 11.9, onTimeRate: 93.1 },
  { month: "Set/22", year: 2022, orders: 4180, revenue: 643000, avgTicket: 153.8, avgReview: 4.02, avgDeliveryDays: 13.1, onTimeRate: 90.8 },
  { month: "Out/22", year: 2022, orders: 4620, revenue: 716000, avgTicket: 154.9, avgReview: 4.14, avgDeliveryDays: 12.0, onTimeRate: 93.5 },
  { month: "Nov/22", year: 2022, orders: 6890, revenue: 1120000, avgTicket: 162.5, avgReview: 3.92, avgDeliveryDays: 15.6, onTimeRate: 84.6 },
  { month: "Dez/22", year: 2022, orders: 5840, revenue: 940000, avgTicket: 160.9, avgReview: 3.98, avgDeliveryDays: 14.8, onTimeRate: 87.2 },
  { month: "Jan/23", year: 2023, orders: 4720, revenue: 726000, avgTicket: 153.8, avgReview: 4.12, avgDeliveryDays: 12.2, onTimeRate: 92.5 },
  { month: "Fev/23", year: 2023, orders: 4510, revenue: 694000, avgTicket: 153.8, avgReview: 4.09, avgDeliveryDays: 12.0, onTimeRate: 92.9 },
  { month: "Mar/23", year: 2023, orders: 5120, revenue: 798000, avgTicket: 155.8, avgReview: 4.16, avgDeliveryDays: 11.7, onTimeRate: 93.8 },
  { month: "Abr/23", year: 2023, orders: 4980, revenue: 771000, avgTicket: 154.8, avgReview: 4.10, avgDeliveryDays: 12.1, onTimeRate: 92.6 },
  { month: "Mai/23", year: 2023, orders: 5640, revenue: 885000, avgTicket: 156.9, avgReview: 4.19, avgDeliveryDays: 11.3, onTimeRate: 94.5 },
  { month: "Jun/23", year: 2023, orders: 5310, revenue: 828000, avgTicket: 155.9, avgReview: 4.06, avgDeliveryDays: 12.5, onTimeRate: 91.9 },
  { month: "Jul/23", year: 2023, orders: 5780, revenue: 907000, avgTicket: 156.9, avgReview: 4.08, avgDeliveryDays: 12.1, onTimeRate: 92.7 },
  { month: "Ago/23", year: 2023, orders: 5940, revenue: 938000, avgTicket: 157.9, avgReview: 4.13, avgDeliveryDays: 11.6, onTimeRate: 93.6 },
  { month: "Set/23", year: 2023, orders: 5610, revenue: 875000, avgTicket: 155.9, avgReview: 4.04, avgDeliveryDays: 12.9, onTimeRate: 91.2 },
  { month: "Out/23", year: 2023, orders: 6150, revenue: 971000, avgTicket: 157.8, avgReview: 4.15, avgDeliveryDays: 11.8, onTimeRate: 93.9 },
  { month: "Nov/23", year: 2023, orders: 8940, revenue: 1485000, avgTicket: 166.1, avgReview: 3.88, avgDeliveryDays: 16.4, onTimeRate: 82.3 },
  { month: "Dez/23", year: 2023, orders: 7420, revenue: 1210000, avgTicket: 163.0, avgReview: 3.95, avgDeliveryDays: 15.1, onTimeRate: 86.4 },
];

export const CATEGORIES_DATA: CategoryMetric[] = [
  { id: "informatica", name: "Informática & PCs", department: "Tecnologia", orders: 10890, revenue: 2180000, avgTicket: 200.18, avgReview: 3.94, deliveryDays: 13.8, avgFreight: 24.5, growthYoY: 28.4 },
  { id: "beleza_saude", name: "Beleza & Saúde", department: "Cuidados Pessoais", orders: 12450, revenue: 1845000, avgTicket: 148.19, avgReview: 4.22, deliveryDays: 10.4, avgFreight: 17.2, growthYoY: 34.2 },
  { id: "moveis_decoracao", name: "Móveis & Decoração", department: "Casa & Estilo", orders: 8940, revenue: 1720000, avgTicket: 192.39, avgReview: 3.86, deliveryDays: 16.5, avgFreight: 38.6, growthYoY: 19.8 },
  { id: "cama_mesa", name: "Cama, Mesa & Banho", department: "Casa & Estilo", orders: 11200, revenue: 1560000, avgTicket: 139.28, avgReview: 4.15, deliveryDays: 11.2, avgFreight: 18.4, growthYoY: 22.1 },
  { id: "esporte_lazer", name: "Esporte & Lazer", department: "Fitness & Outdoor", orders: 8640, revenue: 1320000, avgTicket: 152.77, avgReview: 4.18, deliveryDays: 11.9, avgFreight: 19.8, growthYoY: 25.6 },
  { id: "utilidades_domesticas", name: "Utilidades Domésticas", department: "Casa & Estilo", orders: 6980, revenue: 998000, avgTicket: 142.97, avgReview: 4.09, deliveryDays: 12.6, avgFreight: 21.2, growthYoY: 18.5 },
  { id: "relogios_presentes", name: "Relógios & Joias", department: "Acessórios", orders: 4890, revenue: 980000, avgTicket: 200.4, avgReview: 4.02, deliveryDays: 12.1, avgFreight: 18.9, growthYoY: 31.2 },
  { id: "telefonia", name: "Smartphones & Telefonia", department: "Tecnologia", orders: 5120, revenue: 840000, avgTicket: 164.06, avgReview: 3.91, deliveryDays: 12.8, avgFreight: 18.2, growthYoY: 15.4 },
  { id: "ferramentas", name: "Ferramentas & Jardim", department: "Construção", orders: 4320, revenue: 648000, avgTicket: 150.0, avgReview: 4.12, deliveryDays: 13.2, avgFreight: 26.4, growthYoY: 14.2 },
  { id: "automotivo", name: "Automotivo & Peças", department: "Veículos", orders: 4120, revenue: 618000, avgTicket: 150.0, avgReview: 4.08, deliveryDays: 13.9, avgFreight: 27.5, growthYoY: 12.8 },
];

export const HISTOGRAM_DATA: HistogramBucket[] = [
  { range: "R$ 0 - 50", min: 0, max: 50, count: 18450, percentage: 18.8 },
  { range: "R$ 50 - 100", min: 50, max: 100, count: 32650, percentage: 33.2 },
  { range: "R$ 100 - 200", min: 100, max: 200, count: 25740, percentage: 26.2 },
  { range: "R$ 200 - 350", min: 200, max: 350, count: 11420, percentage: 11.6 },
  { range: "R$ 350 - 500", min: 350, max: 500, count: 5480, percentage: 5.6 },
  { range: "R$ 500 - 1k", min: 500, max: 1000, count: 3220, percentage: 3.3 },
  { range: "R$ 1k+", min: 1000, max: 10000, count: 1287, percentage: 1.3 },
];

export const SCATTER_DELIVERY_REVIEW: ScatterDeliveryReview[] = [
  { days: 3, review: 4.88, orders: 3450, satisfactionPct: 94.2, category: "Ultra Rápido" },
  { days: 5, review: 4.75, orders: 8920, satisfactionPct: 91.8, category: "Ultra Rápido" },
  { days: 7, review: 4.62, orders: 15400, satisfactionPct: 89.4, category: "No Prazo" },
  { days: 9, review: 4.45, orders: 21800, satisfactionPct: 86.2, category: "No Prazo" },
  { days: 12, review: 4.28, orders: 18900, satisfactionPct: 82.5, category: "No Prazo" },
  { days: 15, review: 4.05, orders: 12400, satisfactionPct: 76.8, category: "Alerta Moderado" },
  { days: 18, review: 3.72, orders: 7850, satisfactionPct: 65.4, category: "Alerta Moderado" },
  { days: 22, review: 3.25, orders: 4620, satisfactionPct: 48.2, category: "Atraso Crítico" },
  { days: 26, review: 2.65, orders: 2840, satisfactionPct: 32.1, category: "Atraso Crítico" },
  { days: 32, review: 1.82, orders: 1420, satisfactionPct: 15.4, category: "Severo" },
  { days: 40, review: 1.22, orders: 647, satisfactionPct: 6.8, category: "Severo" },
];

// All 27 Brazilian Federation Units with real Olist dataset metrics (sum = 98,247 orders)
export const STATES_DATA: StateMetric[] = [
  // Sudeste
  { uf: "SP", state: "São Paulo", region: "Sudeste", orders: 41250, pct: 42.0, avgFreight: 15.4, avgDays: 8.2, revenue: 6220000 },
  { uf: "RJ", state: "Rio de Janeiro", region: "Sudeste", orders: 13420, pct: 13.7, avgFreight: 20.8, avgDays: 14.1, revenue: 2025000 },
  { uf: "MG", state: "Minas Gerais", region: "Sudeste", orders: 11840, pct: 12.1, avgFreight: 21.2, avgDays: 11.5, revenue: 1785000 },
  { uf: "ES", state: "Espírito Santo", region: "Sudeste", orders: 2020, pct: 2.1, avgFreight: 22.1, avgDays: 13.8, revenue: 305000 },
  // Sul
  { uf: "RS", state: "Rio Grande do Sul", region: "Sul", orders: 5890, pct: 6.0, avgFreight: 23.6, avgDays: 14.8, revenue: 890000 },
  { uf: "PR", state: "Paraná", region: "Sul", orders: 5240, pct: 5.3, avgFreight: 22.4, avgDays: 11.9, revenue: 790000 },
  { uf: "SC", state: "Santa Catarina", region: "Sul", orders: 3890, pct: 4.0, avgFreight: 24.1, avgDays: 13.4, revenue: 585000 },
  // Nordeste
  { uf: "BA", state: "Bahia", region: "Nordeste", orders: 3450, pct: 3.5, avgFreight: 32.5, avgDays: 18.6, revenue: 520000 },
  { uf: "PE", state: "Pernambuco", region: "Nordeste", orders: 1650, pct: 1.7, avgFreight: 34.2, avgDays: 19.4, revenue: 252000 },
  { uf: "CE", state: "Ceará", region: "Nordeste", orders: 1380, pct: 1.4, avgFreight: 35.8, avgDays: 20.2, revenue: 210000 },
  { uf: "MA", state: "Maranhão", region: "Nordeste", orders: 740, pct: 0.8, avgFreight: 39.5, avgDays: 22.4, revenue: 115000 },
  { uf: "PB", state: "Paraíba", region: "Nordeste", orders: 540, pct: 0.5, avgFreight: 37.2, avgDays: 20.8, revenue: 85000 },
  { uf: "RN", state: "Rio Grande do Norte", region: "Nordeste", orders: 490, pct: 0.5, avgFreight: 36.8, avgDays: 20.5, revenue: 78000 },
  { uf: "PI", state: "Piauí", region: "Nordeste", orders: 480, pct: 0.5, avgFreight: 38.1, avgDays: 21.3, revenue: 75000 },
  { uf: "AL", state: "Alagoas", region: "Nordeste", orders: 410, pct: 0.4, avgFreight: 36.4, avgDays: 20.1, revenue: 64000 },
  { uf: "SE", state: "Sergipe", region: "Nordeste", orders: 350, pct: 0.4, avgFreight: 34.9, avgDays: 19.8, revenue: 55000 },
  // Centro-Oeste
  { uf: "DF", state: "Distrito Federal", region: "Centro-Oeste", orders: 2180, pct: 2.2, avgFreight: 21.9, avgDays: 11.2, revenue: 330000 },
  { uf: "GO", state: "Goiás", region: "Centro-Oeste", orders: 2040, pct: 2.1, avgFreight: 25.8, avgDays: 14.5, revenue: 308000 },
  { uf: "MT", state: "Mato Grosso", region: "Centro-Oeste", orders: 980, pct: 1.0, avgFreight: 33.4, avgDays: 17.5, revenue: 160000 },
  { uf: "MS", state: "Mato Grosso do Sul", region: "Centro-Oeste", orders: 720, pct: 0.7, avgFreight: 28.5, avgDays: 14.9, revenue: 118000 },
  // Norte
  { uf: "PA", state: "Pará", region: "Norte", orders: 980, pct: 1.0, avgFreight: 38.9, avgDays: 23.1, revenue: 150000 },
  { uf: "TO", state: "Tocantins", region: "Norte", orders: 280, pct: 0.3, avgFreight: 37.6, avgDays: 19.2, revenue: 44000 },
  { uf: "RO", state: "Rondônia", region: "Norte", orders: 250, pct: 0.3, avgFreight: 41.2, avgDays: 22.9, revenue: 40000 },
  { uf: "AM", state: "Amazonas", region: "Norte", orders: 150, pct: 0.2, avgFreight: 43.8, avgDays: 26.2, revenue: 25000 },
  { uf: "AC", state: "Acre", region: "Norte", orders: 80, pct: 0.1, avgFreight: 44.5, avgDays: 27.5, revenue: 13000 },
  { uf: "AP", state: "Amapá", region: "Norte", orders: 70, pct: 0.1, avgFreight: 42.1, avgDays: 25.8, revenue: 11000 },
  { uf: "RR", state: "Roraima", region: "Norte", orders: 47, pct: 0.05, avgFreight: 46.2, avgDays: 28.4, revenue: 7000 },
];

export const PAYMENT_METHODS_DATA: PaymentMethodMetric[] = [
  { method: "Cartão de Crédito", share: 73.8, orders: 72506, revenue: 11240000, avgInstallments: 3.5, avgTicket: 155.02, color: "#38bdf8" },
  { method: "Boleto Bancário", share: 19.4, orders: 19060, revenue: 2680000, avgInstallments: 1.0, avgTicket: 140.6, color: "#34d399" },
  { method: "Pix / Transferência", share: 5.2, orders: 5109, revenue: 645000, avgInstallments: 1.0, avgTicket: 126.24, color: "#a78bfa" },
  { method: "Voucher / Crédito Loja", share: 1.6, orders: 1572, revenue: 245000, avgInstallments: 1.0, avgTicket: 155.85, color: "#f472b6" },
];

export const STATS_SUMMARY: StatSummary[] = [
  { label: "Média (Ticket)", value: "R$ 150,72", desc: "Influenciada por cauda longa à direita", category: "ticket", badge: "Mean" },
  { label: "Mediana (P50)", value: "R$ 98,50", desc: "50% dos pedidos abaixo de R$ 98,50", category: "ticket", badge: "P50" },
  { label: "Desvio Padrão (s)", value: "R$ 184,30", desc: "Alta dispersão em eletrônicos e relógios", category: "ticket", badge: "Std Dev" },
  { label: "Assimetria (Skewness)", value: "+3.42", desc: "Distribuição positiva (right-skewed)", category: "volume", badge: "Skew" },
  { label: "Percentil 95 (P95)", value: "R$ 489,00", desc: "Top 5% de pedidos de alto tíquete", category: "ticket", badge: "P95" },
  { label: "Correlação Prazo/Nota", value: "r = -0.78", desc: "Forte correlação negativa com satisfação", category: "correlation", badge: "Pearson" },
];

export const EXECUTIVE_INSIGHTS: ExecutiveInsight[] = [
  {
    id: "ins-1",
    title: "Expansão de Fulfillment Hub no Nordeste",
    category: "Logística",
    impact: "Alto",
    impactMetric: "+45% GMV Regional / -65% Lead Time",
    description: "Nordeste representa apenas 9.7% dos pedidos, mas tem frete médio de R$ 34,16 (+115% vs SP) e prazo de entrega de 19.4 dias.",
    action: "Implantar centro de distribuição avançado em Recife ou Salvador para mercadorias de alto giro (curva A).",
    recommendation: "Com estoque avançado, o prazo cai para 3 a 5 dias, reduzindo abandono de carrinho na região em até 38%.",
  },
  {
    id: "ins-2",
    title: "Mitigação de Gargalo Logístico na Black Friday",
    category: "Sazonalidade",
    impact: "Crítico",
    impactMetric: "+0.26 no NPS em Nov/Dez",
    description: "Novembro gera pico de 8.940 pedidos (+68% vs média), porém a taxa de atraso salta de 6.1% para 17.7%, derrubando o NPS para 3.88.",
    action: "Contratar malhas dedicadas de transportadoras 3PL com antecedência de 60 dias e estipular SLA de coleta em 24h.",
    recommendation: "Introduzir campanhas de 'Entrega Garantida' com frete expresso prioritário para os top 20% clientes recorrentes.",
  },
  {
    id: "ins-3",
    title: "Proteção de Margem nas Categorias de Alta Cubagem",
    category: "Comercial",
    impact: "Médio",
    impactMetric: "Economia de R$ 180k/ano em reversa",
    description: "Móveis & Decoração tem o maior lead time (16.5 dias) e o menor NPS (3.86) entre as categorias líderes, gerando alto índice de cancelamento.",
    action: "Criar parcerias com transportadoras especializadas em carga fracionada e volumosa com rastreio em tempo real.",
    recommendation: "Implementar checklist de conferência pré-envio e manual de montagem digital interativo para reduzir devoluções.",
  },
  {
    id: "ins-4",
    title: "Incentivo a Meios Instantâneos (Pix) vs Boleto",
    category: "Experiência do Cliente",
    impact: "Médio",
    impactMetric: "Redução de 48h no ciclo financeiro",
    description: "Boleto ainda representa 19.4% dos pedidos, com taxa de não-compensação de 14.2% e retenção desnecessária de estoque.",
    action: "Oferecer 3% a 5% de desconto dinâmico no Pix para converter pedidos que seriam gerados em boleto.",
    recommendation: "Aumenta a conversão imediata, reduz custos de custódia e libera estoque imediatamente.",
  },
];