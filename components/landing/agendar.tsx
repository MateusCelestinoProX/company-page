"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Agendar({ onBack }: { onBack: () => void }) {
  return (
    <section
      id="agendar"
      aria-labelledby="agendar-title"
      className="relative py-24 px-6 bg-[#000] min-h-[85vh] flex flex-col justify-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2
            className="text-xs font-mono tracking-widest uppercase text-sanguine-glow mb-4"
            id="agendar-title"
          >
            Sessão Estratégica
          </h2>
          <h3 className="text-3xl md:text-5xl font-black font-tech text-white">
            Agende seu Diagnóstico Técnico
          </h3>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Consulte os horários disponíveis em tempo real e agende a reunião de
            estratégia da sua empresa.
          </p>
        </div>

        <Card className="bg-black/80 border border-white/10 rounded-3xl p-2 md:p-6 shadow-cyber-card overflow-hidden backdrop-blur-2xl">
          <CardContent className="p-0">
            <iframe
              title="Agendamento SmartFlow"
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ25zm5ulupePb8PJ1sgr3c0R-P9uMPnv33OE3fiAjBhKQGkLmp2OAmlWmVgmplAOx8d0DKVsRi6?gv=true"
              style={{ border: 0 }}
              width="100%"
              height={600}
              frameBorder={0}
              aria-label="Widget de agendamento Google Calendar"
            />
          </CardContent>
        </Card>

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
