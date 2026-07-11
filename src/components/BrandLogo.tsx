import { useState } from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({
  className = "",
  size = "md",
}: BrandLogoProps) {
  const containerClasses =
    size === "sm" ? "gap-1.5" : size === "lg" ? "gap-3" : "gap-2";
  const iconBgClasses =
    size === "sm"
      ? "p-1.5 rounded-lg"
      : size === "lg"
        ? "p-3 rounded-2xl"
        : "p-2 rounded-xl";
  const logoTextClasses =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const iconSizeClasses =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div
      className={`flex items-center ${containerClasses} ${className}`}
      id="studyflash-brand-logo"
    >
      <div
        className={`bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:scale-100 shadow-md shadow-emerald-500/15 ${iconBgClasses} transition-all duration-300`}
      >
        <svg
          className={`${iconSizeClasses} text-white`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`${logoTextClasses} font-extrabold font-sans tracking-tight leading-none text-emerald-600 dark:text-emerald-400`}
        >
          Study<span className="text-slate-800 dark:text-white">Flash.in</span>
        </span>
        <span className="text-[8px] font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-extrabold mt-0.5">
          Premium EdTech
        </span>
      </div>
    </div>
  );
}
