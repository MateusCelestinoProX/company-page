"use client";

import * as React from "react";

import { usePrefersReducedMotion } from "./a11y";

function usePrefersReducedMotionLocal() {
  return usePrefersReducedMotion();
}

type GridScanBitProps = {
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // 0..1
  lineThickness?: number; // px-ish
};

export function GridScanBit({
  className,
  style,
  intensity = 0.55,
  lineThickness = 1,
}: GridScanBitProps) {
  const reducedMotion = usePrefersReducedMotionLocal();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [seed] = React.useState(() => Math.random() * 1000);

  React.useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const start = performance.now();

    const tick = () => {
      const now = performance.now();
      const t = (now - start) / 1000;
      // scan position 0..1
      const scan = (t * 0.28) % 1;
      // small jitter
      const j =
        (Math.sin(t * 2.1 + seed) + Math.cos(t * 1.3 + seed * 0.7)) * 0.5;

      el.style.setProperty("--scanY", `${scan * 100}%`);
      el.style.setProperty("--scanJ", `${j * 6}px`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, seed]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={
        className ??
        "absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(70%_60%_at_50%_45%,black_60%,transparent_100%)]"
      }
      style={{
        ...style,
        // drive shader-ish look via CSS vars
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--scanOpacity" as any]: intensity,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--lineThickness" as any]: `${lineThickness}px`,
      }}
    >
      <style jsx>{`
        .gridscan-bit {
          background-color: transparent;
          background-image:
            linear-gradient(
              to bottom,
              rgba(255, 0, 51, 0.18),
              rgba(0, 0, 0, 0) 55%
            ),
            linear-gradient(rgba(255, 0, 51, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 51, 0.15) 1px, transparent 1px);
        }

        .gridscan-bit {
          background-size:
            100% 100%,
            64px 64px,
            64px 64px;
          background-position: center, center, center;
        }

        .scan-line {
          position: absolute;
          inset: 0;
          opacity: var(--scanOpacity, 0.55);
          background: linear-gradient(
            to bottom,
            rgba(255, 0, 51, 0),
            rgba(255, 0, 51, 0.45),
            rgba(255, 0, 51, 0)
          );
          transform: translateY(var(--scanJ, 0px));
          filter: drop-shadow(0 0 16px rgba(255, 0, 51, 0.35));
          height: var(--scanH, 140px);
        }

        .scan-mask {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            70% 60% at 50% 40%,
            rgba(255, 0, 51, 0.18),
            transparent 65%
          );
          opacity: 0.8;
        }
      `}</style>

      <div className="gridscan-bit w-full h-full" />

      <div className="scan-mask" />

      <div
        className="scan-line"
        style={{
          top: "var(--scanY, 40%)",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--scanH" as any]: "160px",
        }}
      />

      {/* subtle noise */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="120" height="120" filter="url(%23n)" opacity="0.5"/></svg>\')',
        }}
      />
    </div>
  );
}
