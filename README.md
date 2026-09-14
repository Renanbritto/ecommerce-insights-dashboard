# 🛒 E-Commerce Insights & Analytics Dashboard

[![CI Pipeline](https://github.com/Renanbritto/ecommerce-insights-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/Renanbritto/ecommerce-insights-dashboard/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Components-black)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Plataforma executiva de **Análise Exploratória de Dados (EDA)** e inteligência de negócios para e-commerce, desenvolvida com **Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI e Recharts**.

O projeto processa e analisa mais de **98.000 pedidos reais** do *Brazilian E-Commerce Public Dataset by Olist (Kaggle)*, traduzindo dados brutos de transações em métricas financeiras, diagnósticos estatísticos, gargalos logísticos regionais e recomendações acionáveis para tomada de decisão executiva.

---

## 📌 Sumário

- [Visão Geral & Problema de Negócio](#-visão-geral--problema-de-negócio)
- [Principais Descobertas Estatísticas (EDA)](#-principais-descobertas-estatísticas-eda)
- [Funcionalidades & Módulos da Aplicação](#-funcionalidades--módulos-da-aplicação)
- [Arquitetura & Stack Tecnológica](#-arquitetura--stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar Localmente](#-como-executar-localmente)
- [Fluxo de Trabalho Git (Branches)](#-fluxo-de-trabalho-git-branches)
- [Exportação de Dados](#-exportação-de-dados)
- [Autor](#-autor)

---

## 🎯 Visão Geral & Problema de Negócio

No comércio eletrônico em escala nacional, equipes de gestão e analytics enfrentam desafios críticos:
1. **Assimetria na Distribuição de Tickets:** Médias aritméticas simples mascaram a concentração real da receita (distribuição com cauda longa à direita).
2. **Gargalos Logísticos e Degradação de NPS:** Picos de demanda (como Black Friday) geram sobrecarga nas transportadoras parceiras, prolongando prazos e deteriorando a avaliação dos clientes.
3. **Disparidade Regional Continental:** O eixo Sudeste concentra o maior volume de pedidos com fretes mais acessíveis, enquanto Norte e Nordeste enfrentam custos de frete mais que dobrados (+92%) e lead times de até 20 dias úteis, elevando a taxa de abandono de carrinho.
4. **Alavancagem Financeira por Meio de Pagamento:** Compras parceladas no cartão de crédito elevam o ticket médio em +22.8%, enquanto o boleto retém estoque desnecessariamente com prazos de compensação de até 3 dias.

Esta plataforma foi concebida para fornecer a diretores de operações, CFOs e analistas de dados uma visão transparente, dinâmica e orientada por hipóteses estatísticas.

---

## 📊 Principais Descobertas Estatísticas (EDA)

| Parâmetro / Métrica | Valor Encontrado | Interpretação de Negócio |
| :--- | :--- | :--- |
| **Volume Total de Pedidos** | **98.247 pedidos** | Base de dados consolidada e tratada de 24 meses. |
| **GMV Total Transacionado** | **R$ 14,81 Milhões** | Crescimento consistente de +32.4% YoY entre 2022 e 2023. |
| **Ticket Médio vs Mediana** | **R$ 150,72** vs **R$ 98,50** | Forte assimetria à direita (*Skewness = +3.42*). 78.2% das transações ficam abaixo de R$ 200. |
| **Percentil 95 (P95)** | **R$ 489,00** | Apenas 5% dos pedidos superam R$ 489, responsáveis por 31% do faturamento total. |
| **Correlação Prazo vs Avaliação** | **r = -0.78 (Pearson)** | Forte correlação negativa. Entregas acima de 15 dias derrubam a nota média de 4.28 para menos de 3.25 estrelas. |
| **Concentração no Sudeste** | **67.8% dos pedidos** | São Paulo sozinho responde por **42.0%** de todo o volume transacionado nacionalmente. |
| **Mix de Pagamentos** | **73.8% Cartão de Crédito** | Parcelamento médio de 3.5x no cartão, seguido por Boleto (19.4%) e Pix (5.2%). |

---

## 🚀 Funcionalidades & Módulos da Aplicação

### 1. Header & KPI Cards Executivos
- Cards superiores dinâmicos com volume de pedidos, GMV total transacionado, comparação ticket médio vs mediana (P50) e nota média de satisfação (NPS).

### 2. Séries Temporais & Sazonalidade
- Gráfico de área interativo de 24 meses (Jan/2022 a Dez/2023).
- Alternância em tempo real entre **Receita (GMV)**, **Volume de Pedidos**, **Ticket Médio** e **NPS**.
- Filtro por ano civil (24 meses completos, 2022 ou 2023).
- Destaque analítico do pico de **Novembro (Black Friday)** com faturamento recorde de R$ 1,48 M (+68% vs média mensal) e o consequente impacto logístico no NPS (queda para 3.88 estrelas).

### 3. Top Departamentos & Categorias
- Ranking horizontal de barras por faturamento acumulado (GMV).
- Tabela interativa com ordenação por Receita, Pedidos, Ticket e NPS.
- Filtro segmentado por departamento (Tecnologia, Cuidados Pessoais, Casa & Estilo, Esportes, etc.).
- Comparativo entre categorias de alta cubagem (Móveis & Decoração) e alto giro com entrega rápida (Beleza & Saúde).

### 4. Distribuição Estatística & Correlações EDA
- **Histograma de Frequências:** Faixas de valor de pedido (R$ 0-50, 50-100, 100-200, 200-350, 350-500, 500-1k, 1k+) evidenciando a distribuição log-normal assimétrica.
- **Gráfico de Dispersão e Curva de Decaimento:** Relação empírica entre dias de trânsito e pontuação da avaliação do consumidor, destacando o ponto de inflexão crítico de 15 dias.
- **Sumário de Métricas Descritivas:** Média, Mediana, Desvio Padrão, Assimetria, Percentil P95 e Coeficiente de Pearson.

### 5. Geografia & Disparidade Logística
- Distribuição de pedidos por Unidade Federativa (UF).
- Painel de disparidade regional comparando Sudeste (frete R$ 17,80 / 9,8 dias) vs Norte/Nordeste (frete R$ 34,16 / 19,4 dias).
- Estudo de viabilidade de implantação de Centro de Distribuição (Fulfillment Hub) no Nordeste para reduzir prazos em até -65%.

### 6. Meios de Pagamento & Parcelamento
- Composição percentual e monetária por modalidade (Cartão de Crédito, Boleto Bancário, Pix e Voucher).
- Análise de impacto do parcelamento no ticket de compra e custo de oportunidade do ciclo de compensação do boleto.

### 7. Plano de Ação & Matriz de Decisão Executiva
- 4 recomendações estratégicas priorizadas por nível de impacto (Crítico, Alto, Médio), com estimativa de retorno financeiro e ações práticas de implementação.

### 8. Modal de Exportação de Dados
- Exportação sob demanda dos dados tratados em formato **CSV** (codificado em UTF-8 com separador `;` compatível com Excel) ou **JSON** formatado para pipelines de dados em Python ou R.

---

## 🛠️ Arquitetura & Stack Tecnológica

| Camada | Tecnologia | Propósito no Projeto |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Renderização híbrida otimizada, bundling ultrarrápido com Turbopack e SEO executivo. |
| **Linguagem** | **TypeScript 5** | Tipagem estrita de todas as interfaces de dados, filtros, agregadores e métricas. |
| **Estilização** | **Tailwind CSS v4** | Sistema de design moderno, modo escuro nativo (*executive dark mode*) e efeitos de superfície glassmorphic. |
| **Componentes UI** | **Shadcn UI & Radix UI** | Primitivas acessíveis para Tabs, Cards, Badges, Botões, Tabelas e Diálogos modais. |
| **Visualização de Dados**| **Recharts & Lucide React** | Gráficos responsivos de Área, Barras Horizontais, Linhas de Dispersão e ícones vetoriais. |
| **Qualidade & CI/CD** | **ESLint & GitHub Actions** | Verificação estática de tipos, linting rigoroso e pipeline de validação automatizada. |

---

## 📁 Estrutura do Projeto

```
ecommerce-insights-dashboard/
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline de CI (Lint e Build no GitHub Actions)
├── public/                      # Ícones e assets estáticos
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system executivo (dark mode, glassmorphism)
│   │   ├── layout.tsx           # Metadados de SEO, OpenGraph e fontes Geist
│   │   └── page.tsx             # Dashboard executivo principal e navegação em abas
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── header-stats.tsx         # KPI cards superiores
│   │   │   ├── temporal-tab.tsx         # Séries temporais e sazonalidade Black Friday
│   │   │   ├── categories-tab.tsx       # Top categorias, ranking e tabela interativa
│   │   │   ├── distribution-tab.tsx     # Histograma e dispersão Entrega vs NPS
│   │   │   ├── geography-tab.tsx        # Análise geográfica e frete por UF
│   │   │   ├── payments-tab.tsx         # Meios de pagamento e parcelamento
│   │   │   ├── insights-tab.tsx         # Plano de ação e recomendações executivas
│   │   │   └── export-modal.tsx         # Modal de exportação para CSV e JSON
│   │   ├── layout/
│   │   │   ├── navbar.tsx               # Barra de navegação com filtros e atalhos
│   │   │   └── footer.tsx               # Rodapé informativo e links do projeto
│   │   └── ui/                          # Componentes modulares Shadcn UI
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── github-icon.tsx
│   │       ├── table.tsx
│   │       └── tabs.tsx
│   ├── data/
│   │   └── ecommerce-dataset.ts # Datasets tipados e estatísticas consolidadas da Olist
│   ├── lib/
│   │   ├── export-utils.ts      # Funções utilitárias de download CSV/JSON (UTF-8)
│   │   └── utils.ts             # Formatadores de moeda (BRL), números e classes CSS (cn)
│   └── types/
│       └── index.ts             # Interfaces TypeScript do domínio de E-Commerce
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💻 Como Executar Localmente

### Pré-requisitos
- **Node.js**: Versão 20.x ou superior (Recomendado 22+)
- **npm** (ou **pnpm** / **yarn**)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Renanbritto/ecommerce-insights-dashboard.git
   cd ecommerce-insights-dashboard
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) para visualizar o dashboard.

5. **Para validar linting e compilação de produção:**
   ```bash
   # Executar verificação estática do ESLint
   npm run lint

   # Gerar build otimizada de produção
   npm run build
   ```

---

## 🌿 Fluxo de Trabalho Git (Branches)

Este projeto segue rigorosamente o padrão de desenvolvimento por branches:
- **`main`**: Versão de produção estável, contendo apenas releases consolidadas.
- **`develop`**: Branch de integração para desenvolvimento contínuo.
- **`feature/*`**: Branches temáticas para implementação granular de novas funcionalidades:
  - `feature/data-and-types`: Definição de tipos TypeScript, modelagem de dados e utilitários.
  - `feature/shadcn-ui-layout`: Componentes Shadcn UI, tema escuro executivo e navegação.
  - `feature/analytics-modules`: Gráficos Recharts, séries temporais, distribuições e abas.
  - `feature/docs-and-ci`: Documentação técnica completa e pipeline de CI no GitHub Actions.

Commits estruturados de acordo com a especificação de **Conventional Commits** (`feat:`, `chore:`, `docs:`, `fix:`).

---

## 💾 Exportação de Dados

A plataforma permite exportar os conjuntos de dados tratados diretamente pelo navegador:
- **CSV (Compatível com Excel):** Arquivos gerados com caractere de controle UTF-8 BOM (`\uFEFF`) e delimitador ponto-e-vírgula (`;`), garantindo acentuação correta no Microsoft Excel em língua portuguesa.
- **JSON Formatado:** Estrutura legível com indentação padrão para importação imediata em notebooks Jupyter, Pandas ou Power BI.

---

## 👤 Autor

Desenvolvido por **Renan Nocelli Britto**:
- **Portfólio:** [renan-nocelli.vercel.app](https://renan-nocelli.vercel.app)
- **GitHub:** [@Renanbritto](https://github.com/Renanbritto)
- **LinkedIn:** [Renan Britto](https://www.linkedin.com/in/renannocelli/)

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).