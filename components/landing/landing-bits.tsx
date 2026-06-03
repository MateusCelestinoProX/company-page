"use client";

import * as React from "react";

import { usePrefersReducedMotion } from "./a11y";

function useAudioBits() {
  const reducedMotion = usePrefersReducedMotion();
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  const play = React.useCallback(
    (frequency: number, duration: number, type: OscillatorType) => {
      if (reducedMotion) return;
      try {
        if (!audioCtxRef.current) {
          const Ctx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext;

          if (!Ctx) return;
          audioCtxRef.current = new Ctx();
        }

        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === "suspended") void ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.value = frequency;

        gain.gain.value = 0.08;
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + duration,
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // noop
      }
    },
    [reducedMotion],
  );

  return play;
}

export function LandingBits({ children }: { children: React.ReactNode }) {
  const play = useAudioBits();

  React.useEffect(() => {
    const handlerOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest("a, button") as HTMLElement | null;
      if (!el) return;
      play(850, 0.015, "sine");
    };

    const handlerClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest("a, button") as HTMLElement | null;
      if (!el) return;
      play(450, 0.06, "triangle");
    };

    document.addEventListener("mouseover", handlerOver, { passive: true });
    document.addEventListener("click", handlerClick, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handlerOver);
      document.removeEventListener("click", handlerClick);
    };
  }, [play]);

  return <>{children}</>;
}
