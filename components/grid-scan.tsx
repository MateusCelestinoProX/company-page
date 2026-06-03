"use client";

import { useEffect, useRef } from "react";

interface GridScanProps {
  className?: string;
  lineColor?: string;
  gridColor?: string;
  speed?: number; // pixels per second
}

export function GridScan({
  className = "",
  lineColor = "#ff0033",
  gridColor = "rgba(255, 0, 51, 0.1)",
  speed = 100,
}: GridScanProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const scanYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      const cellSize = 40;

      // Vertical lines
      for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw scan line with glow
      const scanY = scanYRef.current % height;

      // Main scan line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      // Glow effect behind line
      const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      gradient.addColorStop(0, "rgba(255, 0, 51, 0)");
      gradient.addColorStop(0.5, "rgba(255, 0, 51, 0.2)");
      gradient.addColorStop(1, "rgba(255, 0, 51, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, width, 60);
    };

    let lastTime = 0;
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const delta = Math.min(100, timestamp - lastTime);
      if (delta > 0) {
        scanYRef.current += (speed * delta) / 1000;
      }
      lastTime = timestamp;
      drawGrid();
      animationRef.current = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resize();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [lineColor, gridColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-20 ${className}`}
      style={{ mixBlendMode: "overlay" }}
      aria-hidden="true"
    />
  );
}
