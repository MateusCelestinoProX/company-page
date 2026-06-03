"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { usePrefersReducedMotion } from "./a11y";
import { GridScan } from "./stacks/grid-scan/grid-scan";
import { ShinyText, SplitText } from "./typography-effects";

export type LandingSection = "home" | "squad" | "agendar";

function ShinyWord({ children }: { children: React.ReactNode }) {
  return <ShinyText>{children}</ShinyText>;
}

export function Hero({
  onNavigate,
}: {
  onNavigate: (section: Exclude<LandingSection, "home">) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-[90vh] flex items-center justify-center px-6 pt-12 pb-20 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Grid Scan background (replaces the hero video) */}
        <div className="absolute inset-0 opacity-90">
          <GridScan
            enableWebcam={false}
            showPreview={false}
            enablePost
            sensitivity={0.55}
            lineThickness={1}
            scanOpacity={0.45}
            gridScale={0.11}
            scanColor="#FF9FFC"
            linesColor="#2F293A"
            className="absolute inset-0"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-[#ff0033]/20 blur-[60px]"
        />

        <h1
          id="hero-title"
          className="text-4xl md:text-7xl font-black tracking-tight mb-6 font-tech text-white leading-tight"
        >
          Estratégia de quem <ShinyWord>vende</ShinyWord>
          <br className="hidden md:inline" /> + Execução de quem{" "}
          <SplitText
            text="programa"
            by="word"
            className="inline-block underline decoration-sanguine"
          />
          .
        </h1>

        <p
          className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-10"
          style={
            reducedMotion
              ? undefined
              : {
                  animation: "fadeUp .65s ease-out both",
                  animationDelay: "60ms",
                }
          }
        >
          A SmartFlow projeta, estrutura e codifica sistemas autônomos de
          Inteligência Artificial e Engenharia Web que vendem, integram
          operações e escalam sua empresa sem amarras.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          role="group"
          aria-label="Ações principais"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto px-8 py-5 text-lg tracking-wider uppercase bg-sanguine hover:bg-sanguine/90 shadow-neon-red hover:shadow-neon-red-strong border border-red-500/30"
            onClick={() => onNavigate("agendar")}
          >
            Quero Escalar Meu Negócio
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto px-8 py-5 text-lg tracking-wider uppercase border border-white/10 bg-white/0 hover:bg-white/10"
            onClick={() => onNavigate("squad")}
          >
            Conhecer o Squad
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto border-t border-sanguine-deep/40 pt-10">
          {[
            { v: "75+", t: "Sistemas de IA" },
            { v: "55+", t: "Ferramentas Tech" },
            { v: "46+", t: "Soluções Business", span: true },
          ].map((x) => (
            <div
              key={x.t}
              className={`text-center ${x.span ? "col-span-2 md:col-span-1" : ""}`}
            >
              <div className="text-3xl md:text-4xl font-extrabold font-tech text-white">
                {x.v}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                {x.t}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
