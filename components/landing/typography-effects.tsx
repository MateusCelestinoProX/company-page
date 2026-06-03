"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { usePrefersReducedMotion } from "./a11y";

export function ShinyText({
  as = "span",
  className,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  const Comp = as;
  return (
    <Comp className={cn("relative inline-block", className)}>
      <span className="text-sanguine-glow drop-shadow-[0_0_15px_rgba(255,0,51,0.6)]">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute -inset-2 bg-gradient-to-r from-[#ff0033] via-white to-[#ff0033] opacity-20 blur-xl"
      />
    </Comp>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  /** split unit */
  by?: "word" | "char";
  /** when true, animation triggers on mount */
  animate?: boolean;
};

export function SplitText({
  text,
  className,
  by = "word",
  animate = true,
}: SplitTextProps) {
  const reducedMotion = usePrefersReducedMotion();

  const parts = React.useMemo(() => {
    if (by === "char") return Array.from(text);
    // word split (preserve spaces)
    return text.split(/(\s+)/).filter(Boolean);
  }, [text, by]);

  if (reducedMotion || !animate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap", className)} aria-label={text}>
      {parts.map((part, idx) => {
        const isSpace = /^\s+$/.test(part);
        if (isSpace)
          return <span key={idx} className="whitespace-pre" aria-hidden />;

        return (
          <span
            key={idx}
            aria-hidden
            className={cn(
              "inline-block",
              "transform-gpu",
              "opacity-0",
              "animate-[splitUp_.6s_ease-out_forwards]",
            )}
            style={{
              animationDelay: `${Math.min(idx * 35, 420)}ms`,
            }}
          >
            {part}
          </span>
        );
      })}

      <style jsx>{`
        @keyframes splitUp {
          from {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </span>
  );
}
