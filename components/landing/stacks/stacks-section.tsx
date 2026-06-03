"use client";

import * as React from "react";

import { Card } from "@/components/ui/card";
import {
  Check,
  Database,
  HardDrive,
  Laptop,
  Network,
  Rocket,
  Settings,
  Wrench,
} from "lucide-react";

import { GridScanBit } from "../gridscan-bit-grid";

const stacks = [
  { name: "React", icon: Laptop },
  { name: "Node.js", icon: Network },
  { name: "Express", icon: HardDrive },
  { name: "Firebase", icon: Database },
  { name: "Supabase", icon: Database },
  { name: "n8n", icon: Settings },
  { name: "Airtable", icon: Network },
  { name: "Notion", icon: Wrench },
  { name: "WhatsApp API", icon: Rocket },
];

function StackTile({
  name,
  Icon,
}: {
  name: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Card className="ultra-glass hover:border-sanguine-glow p-4 rounded-xl text-center reveal transition-all duration-300 shadow-cyber-card">
      <Icon size={36} className="text-sanguine-glow mx-auto mb-2" />
      <h5 className="text-xs font-bold text-white uppercase">{name}</h5>
    </Card>
  );
}

export function StacksSection() {
  return (
    <section
      aria-labelledby="stacks-title"
      className="relative py-24 overflow-hidden bg-black border-y border-sanguine-deep/40"
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <GridScanBit className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
      </div>

      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-sanguine-glow mb-4">
            Nossa Tecnologia
          </p>
          <h3
            id="stacks-title"
            className="text-3xl md:text-5xl font-black font-tech text-white"
          >
            Nossas Stacks Digitais
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Empregamos tecnologias velozes e estáveis para desenvolver e
            integrar sua infraestrutura.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
          {stacks.map((s) => (
            <StackTile key={s.name} name={s.name} Icon={s.icon} />
          ))}
        </div>

        <div className="mt-10 flex items-start justify-center">
          <div className="hidden md:flex items-center gap-3 text-xs text-gray-400 border border-white/10 rounded-full px-5 py-2 bg-black/30">
            <Check className="text-sanguine-glow" size={16} aria-hidden />
            Código seguro • Integrações estáveis • Entregas com performance
          </div>
        </div>
      </div>
    </section>
  );
}
