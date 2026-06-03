"use client";

import { Check } from "lucide-react";

import { AuraCard } from "./aura";
import { ShinyText, SplitText } from "./typography-effects";

export function TypographySection({ id = "typography" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="typography-title"
      className="relative py-24 px-6 bg-[#030303] border-y border-sanguine-deep/30"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-sanguine-glow mb-4">
            Typography
          </p>
          <h2
            id="typography-title"
            className="text-3xl md:text-5xl font-black font-tech text-white"
          >
            <SplitText text="Leitura clara com estilo." by="word" />
          </h2>
          <div className="w-24 h-1 bg-sanguine mx-auto mt-4 rounded-full" />
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <AuraCard className="p-8">
              <article className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black font-tech text-white">
                  <ShinyText className="">Nextjs</ShinyText> moderno + acessível
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  Tipografia pensada para leitura: contraste adequado, tamanhos
                  responsivos e animações respeitando{" "}
                  <span className="text-white font-semibold">
                    prefers-reduced-motion
                  </span>
                  .
                </p>

                <blockquote className="border-l-2 border-sanguine/70 pl-4 text-gray-300 italic">
                  “Minimalismo não é ausência de design: é clareza no que
                  importa.”
                </blockquote>

                <ul className="space-y-2">
                  {[
                    "Estrutura sem ruído",
                    "Componentes com props tipadas",
                    "Foco visível e navegação por teclado",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-1 text-sanguine-glow" aria-hidden>
                        <Check size={16} />
                      </span>
                      <span className="text-sm md:text-[15px] text-gray-300">
                        {x}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </AuraCard>

            <AuraCard className="p-8">
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-sanguine-glow">
                  Inline code
                </p>
                <p className="text-gray-300">
                  Exemplo:{" "}
                  <code className="px-2 py-1 rounded-md bg-white/5 text-white text-sm">{`<Component />`}</code>
                </p>
              </div>
            </AuraCard>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <AuraCard className="p-8">
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-sanguine-glow">
                  Lead
                </p>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  Construir uma landing é transformar intenção em UI: rápida,
                  legível e responsiva.
                </p>
              </div>
            </AuraCard>

            <AuraCard className="p-8">
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-sanguine-glow">
                  Tabela
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <caption className="sr-only">Tabela de estilos</caption>
                    <thead className="text-left text-gray-200">
                      <tr>
                        <th scope="col" className="pb-2 pr-4">
                          Elemento
                        </th>
                        <th scope="col" className="pb-2">
                          Tamanho
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-t border-white/5">
                        <th
                          scope="row"
                          className="py-3 pr-4 font-medium text-white/90"
                        >
                          H1
                        </th>
                        <td className="py-3">4xl → 7xl</td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <th
                          scope="row"
                          className="py-3 pr-4 font-medium text-white/90"
                        >
                          Parágrafos
                        </th>
                        <td className="py-3">base → lg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AuraCard>
          </aside>
        </div>
      </div>
    </section>
  );
}
