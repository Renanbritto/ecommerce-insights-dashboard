import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Insights & Analytics Dashboard | Next.js & Shadcn UI",
  description:
    "Plataforma analítica e executiva de E-Commerce (EDA) desenvolvida em Next.js 16, TypeScript, Tailwind CSS, Shadcn UI e Recharts. Estudo exploratório do Brazilian E-Commerce Public Dataset (Olist Kaggle).",
  keywords: [
    "Next.js",
    "Shadcn UI",
    "TypeScript",
    "Tailwind CSS",
    "Recharts",
    "E-Commerce Analytics",
    "EDA",
    "Data Visualization",
    "Dashboard Executivo",
    "Olist Dataset",
  ],
  authors: [{ name: "Renan Nocelli Britto", url: "https://renan-nocelli.vercel.app" }],
  creator: "Renan Nocelli Britto",
  openGraph: {
    title: "E-Commerce Insights & Analytics Dashboard",
    description: "Plataforma analítica e executiva de E-Commerce (EDA) desenvolvida em Next.js e Shadcn UI.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#070b12] text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {children}
      </body>
    </html>
  );
}
