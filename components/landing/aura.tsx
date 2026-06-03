"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { usePrefersReducedMotion } from "./a11y";

export function AuraCard({
  className,
  children,
  radiusClassName = "rounded-2xl",
}: {
  className?: string;
  children: React.ReactNode;
  radiusClassName?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/10 bg-black/20",
        radiusClassName,
        "transition-all duration-300",
        "shadow-[0_10px_40px_rgba(0,0,0,0.9)]",
        "focus-within:ring-2 focus-within:ring-sanguine",
        "hover:border-sanguine",
        reducedMotion ? "" : "group",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          "bg-[radial-gradient(600px_circle_at_20%_10%,rgba(255,0,51,0.22),transparent_60%),radial-gradient(420px_circle_at_80%_20%,rgba(255,0,51,0.15),transparent_60%)]",
          "group-hover:opacity-100",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300",
          "bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,0,51,0.0),rgba(255,0,51,0.35),rgba(255,255,255,0.0))]",
          "blur-xl",
          "group-hover:opacity-80",
        )}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
