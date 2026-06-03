"use client";

import * as React from "react";

import { Agendar } from "@/components/landing/agendar";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import {
  PhilosophySection,
  ServicesSection,
} from "@/components/landing/minimal-sections";
import { Navbar } from "@/components/landing/navbar";
import { TypographySection } from "@/components/landing/section-typography";
import { Squad } from "@/components/landing/squad";

import type { LandingSection } from "@/components/landing/hero";

export default function Home() {
  const [active, setActive] = React.useState<LandingSection>("home");

  const navigate = React.useCallback(
    (section: Exclude<LandingSection, "home">) => {
      setActive(section);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [],
  );

  const navigateTo = React.useCallback((section: LandingSection) => {
    setActive(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    // Reveal animations for elements marked with `.reveal`.
    // This is optional and keeps the UI accessible/minimal.
    import("@/components/landing/sections-reveal").then((mod) => {
      // `useRevealOnScroll` is a hook; do not call it imperatively.
      // The hook is used by components that need reveal.
      void mod;
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <Navbar active={active} onNavigate={(section) => navigateTo(section)} />

      <main aria-label="Conteúdo principal">
        {active === "home" && (
          <>
            <Hero onNavigate={(s) => navigate(s)} />
            <PhilosophySection />
            <ServicesSection />
            {/* Typography (minimal, a11y, responsive) */}
            {/** client component */}
            <TypographySection />
          </>
        )}

        {active === "squad" && <Squad onBack={() => navigateTo("home")} />}
        {active === "agendar" && <Agendar onBack={() => navigateTo("home")} />}
      </main>

      <Footer />

      <a
        href="https://wa.me/5531997724257"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale Conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 bg-black/20 backdrop-blur-xl"
      >
        <i
          className="fa-brands fa-whatsapp text-3xl text-emerald-400 hover:text-emerald-300 transition-all duration-300"
          aria-hidden
        />
      </a>
    </div>
  );
}
