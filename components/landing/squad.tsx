"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Squad({ onBack }: { onBack: () => void }) {
  const members = [
    {
      name: "Mateus Celestino",
      role: "Professional Marketer",
      subRole: "Sales & Automation Manager",
      image: "/mateus.png",
      website: "https://mateus-celestino-pro.bullet.site/",
      linkedin: "https://www.linkedin.com/in/mateus-celestino/",
      badge: "FOUNDER",
      description:
        "Formado em Marketing Digital. Especialista certificado em Typebot, N8N, Mautic, Baserow e outras ferramentas open-source robustas.",
    },
    {
      name: "Odilon",
      role: "Front End & Backend Dev",
      subRole: "Fullstack Engineer",
      image: "/odilon.png",
      website: null,
      linkedin: "https://www.linkedin.com/in/odilon-dev/",
      badge: "ENGINEER",
      description:
        "Desenvolvedor Fullstack com foco em interfaces elegantes, usabilidade e estabilidade de sistemas.",
    },
  ];

  return (
    <section
      id="squad"
      aria-labelledby="squad-title"
      className="relative py-24 px-6 bg-[#020202] min-h-[85vh] flex flex-col justify-center"
    >
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-sanguine/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sanguine/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest uppercase text-sanguine-glow mb-4">
            Engenharia e Estratégia
          </h2>
          <h3
            id="squad-title"
            className="text-4xl md:text-6xl font-black font-tech text-white"
          >
            Squad
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Unindo alta estratégia comercial ao desenvolvimento fullstack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {members.map((m) => (
            <Card
              key={m.name}
              className="ultra-glass rounded-2xl p-8 relative overflow-hidden group hover:border-sanguine transition-all duration-300 shadow-cyber-card"
            >
              <div
                className="absolute -top-20 -right-20 w-48 h-48 bg-sanguine/10 rounded-full blur-3xl group-hover:bg-sanguine/20 transition-all"
                aria-hidden
              />

              <div className="relative w-full h-80 bg-[#060606] border border-sanguine-deep/30 rounded-xl overflow-hidden mb-6">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-4 left-4 z-20 font-tech font-bold text-white text-lg tracking-wider uppercase">
                  {m.name.toUpperCase()}
                </span>
                <div className="absolute top-4 right-4 bg-sanguine text-white text-[10px] font-mono px-3 py-1 rounded-full border border-red-500 uppercase tracking-widest z-20">
                  {m.badge}
                </div>
              </div>

              <h4 className="text-2xl font-black font-tech text-white mb-2">
                {m.name}
              </h4>
              <div className="flex flex-col mb-4">
                <span className="text-sanguine-glow font-mono text-xs uppercase tracking-wider font-semibold">
                  {m.role}
                </span>
                <span className="text-gray-300 font-mono text-xs uppercase tracking-wider">
                  {m.subRole}
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                {m.description}
              </p>

              <div className="border-t border-gray-900 pt-6 mt-8 flex justify-between items-center gap-4">
                {m.website ? (
                  <a
                    href={m.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sanguine-glow hover:text-white transition font-mono flex items-center gap-2"
                  >
                    <i className="fa-solid fa-globe" aria-hidden /> Website
                    Oficial
                  </a>
                ) : (
                  <span className="text-xs text-gray-500 font-mono">
                    Disponível para Projetos
                  </span>
                )}

                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sanguine-glow transition"
                  aria-label={`LinkedIn de ${m.name}`}
                >
                  <i className="fa-brands fa-linkedin text-xl" aria-hidden />
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-xs uppercase tracking-widest"
          >
            <i className="fa-solid fa-arrow-left mr-2" aria-hidden /> Voltar
            para Início
          </Button>
        </div>
      </div>
    </section>
  );
}
