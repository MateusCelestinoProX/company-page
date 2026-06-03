"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import type { LandingSection } from "./hero";

export function Navbar({
  active,
  onNavigate,
}: {
  active: LandingSection;
  onNavigate: (section: LandingSection) => void;
}) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={`sticky top-0 z-50 transition-all duration-300 px-6 py-4 border-b border-white/10 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl"
          : "bg-black/60 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-sanguine rounded-lg"
          aria-label="SmartFlow - ir para Início"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-black border border-sanguine rounded-lg shadow-neon-red">
            <span className="text-sanguine-glow font-black text-xl font-tech">
              S
            </span>
            <div
              className="absolute inset-0 border border-sanguine-glow opacity-30 animate-ping rounded-lg"
              aria-hidden
            />
          </div>
          <span className="text-white font-tech font-bold text-2xl tracking-widest uppercase">
            Smart<span className="text-sanguine-glow">Flow</span>
          </span>
        </button>

        <div
          className="flex items-center space-x-6"
          role="navigation"
          aria-label="Seções"
        >
          <button
            type="button"
            onClick={() => onNavigate("squad")}
            className={`text-xs font-semibold uppercase tracking-widest transition px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sanguine ${
              active === "squad"
                ? "text-sanguine-glow"
                : "text-gray-300 hover:text-sanguine-glow"
            }`}
          >
            Squad
          </button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => onNavigate("agendar")}
            className="relative group overflow-hidden px-6 py-2.5 rounded-xl border border-red-500/30 bg-black/40 backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(255,0,51,0.15)] hover:shadow-[0_0_25px_rgba(255,0,51,0.4)] flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sanguine opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sanguine-glow shadow-[0_0_10px_#ff0033]" />
            </span>
            <span className="text-white font-tech font-bold text-xs uppercase tracking-widest">
              Agendar
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
