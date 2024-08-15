// Canva.jsx

"use client";
import React, { useEffect } from "react";
import style from "./Canva.module.css";
import { useGlobalContext } from "@/context/globalContext";

const Canva = () => {
  const { color, transparency, pixelSize, canvasRef, brushType } =
    useGlobalContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.globalAlpha = transparency; // Aplicar transparencia
  }, [color, transparency, pixelSize, canvasRef]);

  const handleMouseDown = (e) => {
    drawPixel(e);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      drawPixel(e);
    }
  };

  const drawPixel = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawBrush(ctx, x, y, pixelSize, brushType);
  };

  const drawBrush = (ctx, x, y, size, type) => {
    ctx.globalAlpha = transparency;
    ctx.fillStyle = color;

    switch (type) {
      case "circle":
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.closePath();
        ctx.fill();
        break;
      case "star":
        // Lógica para dibujar una estrella
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(
            Math.cos(((18 + i * 72) / 180) * Math.PI) * size + x,
            -Math.sin(((18 + i * 72) / 180) * Math.PI) * size + y
          );
          ctx.lineTo(
            Math.cos(((54 + i * 72) / 180) * Math.PI) * (size / 2) + x,
            -Math.sin(((54 + i * 72) / 180) * Math.PI) * (size / 2) + y
          );
        }
        ctx.closePath();
        ctx.fill();
        break;
      default:
        ctx.fillRect(x, y, size, size);
        break;
    }
  };

  return (
    <div className={style.ContenedorGeneral}>
      <canvas
        ref={canvasRef}
        width={1470}
        height={800}
        className={style.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Canva;
