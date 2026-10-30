"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function Logo({ className, size = "md", withText = false }: LogoProps) {
  const sizeMap = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const svgDimensions = {
    sm: 28,
    md: 36,
    lg: 44,
  };

  const dim = svgDimensions[size];

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      {/* Logo Mark */}
      <div
        className={cn(
          sizeMap[size],
          "relative rounded-xl flex items-center justify-center shrink-0",
          "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600",
          "shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/20",
          "border border-cyan-300/40 dark:border-cyan-400/30",
          "transition-transform duration-200 group-hover:scale-105"
        )}
      >
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full p-1.5"
        >
          <defs>
            {/* Bag Body Gradient */}
            <linearGradient id="logo-bag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.85" />
            </linearGradient>

            {/* Bars Gradient */}
            <linearGradient id="logo-bar-1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="logo-bar-2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="logo-bar-3" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Sparkle Glow Filter */}
            <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Bag Handle */}
          <path
            d="M13.5 12V9C13.5 6.51472 15.5147 4.5 18 4.5C20.4853 4.5 22.5 6.51472 22.5 9V12"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Bag Silhouette */}
          <path
            d="M9.5 12H26.5L24.8 28.5C24.65 29.9 23.5 31 22.1 31H13.9C12.5 31 11.35 29.9 11.2 28.5L9.5 12Z"
            fill="url(#logo-bag-grad)"
            fillOpacity="0.2"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Rising Analytics Bars inside the bag */}
          {/* Bar 1 */}
          <rect
            x="13"
            y="21"
            width="2.6"
            height="6"
            rx="1.3"
            fill="url(#logo-bar-1)"
          />
          {/* Bar 2 */}
          <rect
            x="16.7"
            y="17.5"
            width="2.6"
            height="9.5"
            rx="1.3"
            fill="url(#logo-bar-2)"
          />
          {/* Bar 3 */}
          <rect
            x="20.4"
            y="14"
            width="2.6"
            height="13"
            rx="1.3"
            fill="url(#logo-bar-3)"
          />

          {/* Upward Growth Trendline */}
          <path
            d="M11 23L16.5 17.5L20 20L25 13"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing Growth Apex Node */}
          <circle
            cx="25"
            cy="13"
            r="2"
            fill="#34d399"
            stroke="#ffffff"
            strokeWidth="1.2"
            filter="url(#logo-glow)"
          />
        </svg>
      </div>

      {/* Optional Wordmark */}
      {withText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              E-Commerce
            </span>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Insights
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            Executive Analytics Platform
          </span>
        </div>
      )}
    </div>
  );
}