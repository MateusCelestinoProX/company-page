"use client";

import * as React from "react";

export type TextAlign = "left" | "center";

function Block({
  as,
  className,
  children,
}: {
  as: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  const Comp = as;
  return <Comp className={className}>{children}</Comp>;
}

export function TypographyTitle({
  as = "h1",
  children,
  align = "center",
}: {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  align?: TextAlign;
}) {
  const cls = align === "center" ? "text-center" : "text-left";

  return (
    <Block
      as={as}
      className={cls + " font-tech font-black tracking-tight text-white"}
    >
      {children}
    </Block>
  );
}

export function TypographyParagraph({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: TextAlign;
}) {
  const cls = align === "center" ? "text-center" : "text-left";
  return <p className={cls + " text-gray-300 leading-relaxed"}>{children}</p>;
}
