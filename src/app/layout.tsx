import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RN Intelligence | E-Commerce Analytics Platform",
  description:
    "Plataforma analítica e executiva de E-Commerce (EDA) RN Intelligence desenvolvida em Next.js 16, TypeScript, Tailwind CSS, Shadcn UI e Recharts. Estudo exploratório do Brazilian E-Commerce Public Dataset (Olist Kaggle).",
  keywords: [
    "RN Intelligence",
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
    title: "RN Intelligence | E-Commerce Analytics Platform",
    description: "Plataforma analítica e executiva de E-Commerce (EDA) RN Intelligence desenvolvida em Next.js e Shadcn UI.",
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
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.style.colorScheme = 'dark';
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${comfortaa.variable} font-sans antialiased bg-slate-50 text-slate-900 dark:bg-[#070b12] dark:text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-200 transition-colors duration-200`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}