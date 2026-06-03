"use client";

import { Card } from "@/components/ui/card";

export function PhilosophySection() {
  return (
    <section
      aria-labelledby="philosophy-title"
      className="relative py-24 px-6 bg-[#030303] border-y border-sanguine-deep/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-xs font-mono tracking-widest uppercase text-sanguine-glow mb-4"
            id="philosophy-title"
          >
            Filosofia de Operação
          </h2>
          <h3 className="text-3xl md:text-5xl font-black font-tech text-white">
            Por que a SmartFlow Existe?
          </h3>
          <div className="w-24 h-1 bg-sanguine mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card className="ultra-glass p-8 rounded-2xl reveal overflow-hidden group hover:border-sanguine transition-all duration-300 border border-white/10">
              <div className="flex items-start gap-4">
                <div
                  className="text-sanguine-glow text-3xl p-3 bg-sanguine-dark rounded-xl"
                  aria-hidden
                >
                  <i className="fa-solid fa-bolt" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-tech text-white mb-2">
                    Eliminação da Rotina Repetitiva
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Vivemos a dor do comercial no dia a dia. Automatizamos cada
                    etapa burocrática para blindar o seu tempo de execução.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="ultra-glass p-8 rounded-2xl reveal overflow-hidden group hover:border-sanguine transition-all duration-300 border border-white/10">
              <div className="flex items-start gap-4">
                <div
                  className="text-sanguine-glow text-3xl p-3 bg-sanguine-dark rounded-xl"
                  aria-hidden
                >
                  <i className="fa-solid fa-code-branch" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-tech text-white mb-2">
                    A Solução Sem Amarras
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Quando automação e programação se unem de verdade, o gargalo
                    operacional desaparece e você escala com estabilidade.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 bg-black border border-sanguine-deep p-8 rounded-2xl shadow-cyber-card reveal relative flex flex-col justify-between">
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-sanguine/10 rounded-full blur-3xl"
              aria-hidden
            />

            <div>
              <h4 className="text-xl font-bold font-tech mb-6 text-white border-b border-gray-800 pb-4">
                Nossa Filosofia Operacional
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-sanguine-glow text-lg mt-1" aria-hidden>
                    <i className="fa-solid fa-circle-check" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-md">
                      No que acreditamos
                    </h5>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      O vendedor foi feito para vender; automação protege a
                      operação humana.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-sanguine-glow text-lg mt-1" aria-hidden>
                    <i className="fa-solid fa-diagram-project" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-md">
                      O que entregamos de verdade
                    </h5>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Planejamento e desenvolvimento sob medida com dashboards e
                      suporte ágil.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-950">
              <p className="text-sanguine-glow font-bold text-sm font-tech uppercase tracking-wider">
                Inteligência aplicada à escala corporativa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const services = [
    {
      icon: "fa-solid fa-laptop-code",
      title: "Criação de Software Sob Medida",
      description:
        "Desenvolvimento completo de sistemas e plataformas web customizadas que resolvem gargalos com eficiência.",
      highlight: true,
    },
    {
      icon: "fa-solid fa-robot",
      title: "AI Chatbots Inteligentes",
      description:
        "Robôs treinados com a inteligência do seu produto que qualificam e conduzem até a reunião.",
    },
    {
      icon: "fa-solid fa-filter",
      title: "Qualificação de Leads",
      description:
        "Triagem instantânea do fit do cliente em segundos, com alertas só para leads quentes.",
    },
  ];

  return (
    <section
      aria-labelledby="services-title"
      className="relative py-24 overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden bg-black"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="relative z-10 px-6 max-w-7xl mx-auto pb-24">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest uppercase text-sanguine-glow mb-4">
            Soluções Avançadas
          </h2>
          <h3
            className="text-3xl md:text-5xl font-black font-tech text-white"
            id="services-title"
          >
            Serviços Oferecidos
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Projetamos e executamos as melhores estratégias e soluções técnicas
            para o seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Card
              key={s.title}
              className={`ultra-glass p-8 rounded-2xl reveal hover:border-sanguine transition-all duration-300 shadow-cyber-card relative border border-white/10 ${
                s.highlight ? "border-sanguine-glow/60" : ""
              }`}
            >
              {s.highlight && (
                <div className="absolute top-4 right-4 bg-sanguine text-white text-[9px] font-mono px-2 py-0.5 rounded-full uppercase">
                  Especialidade
                </div>
              )}
              <div className="text-sanguine-glow text-4xl mb-6" aria-hidden>
                <i className={s.icon} />
              </div>
              <h4 className="text-xl font-extrabold text-white mb-3 font-tech">
                {s.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {s.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
