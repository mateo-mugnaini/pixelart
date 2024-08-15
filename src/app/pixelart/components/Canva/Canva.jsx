/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef } from "react";
import style from "./Canva.module.css";
import { useGlobalContext } from "@/context/globalContext";

const Canva = () => {
  const { color, transparency, pixelSize, canvasRef, brushType } =
    useGlobalContext();
  const gridCanvasRef = useRef(null); // Canvas para la cuadrícula

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gridCanvas = gridCanvasRef.current;
    const gridCtx = gridCanvas.getContext("2d");

    const drawGrid = (ctx, width, height, pixelSize) => {
      ctx.clearRect(0, 0, width, height); // Limpiar el canvas
      ctx.fillStyle = "white"; // Color de la cuadrícula
      const step = pixelSize;

      for (let x = 0; x <= width; x += step) {
        for (let y = 0; y <= height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2); // Dibuja un punto
          ctx.fill();
        }
      }
    };

    // Configurar canvas de la cuadrícula
    gridCanvas.width = canvas.width;
    gridCanvas.height = canvas.height;
    drawGrid(gridCtx, gridCanvas.width, gridCanvas.height, pixelSize);

    // Limpiar y redibujar en el canvas principal
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = transparency;
  }, [canvasRef, pixelSize]);

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

    // Alinear al punto más cercano de la cuadrícula
    const gridX = Math.floor(x / size) * size;
    const gridY = Math.floor(y / size) * size;

    switch (type) {
      case "circle":
        ctx.beginPath();
        ctx.arc(gridX + size / 2, gridY + size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(gridX, gridY, size, size);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(gridX + size / 2, gridY);
        ctx.lineTo(gridX + size, gridY + size);
        ctx.lineTo(gridX, gridY + size);
        ctx.closePath();
        ctx.fill();
        break;
      case "star":
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(
            Math.cos(((18 + i * 72) / 180) * Math.PI) * size + gridX + size / 2,
            -Math.sin(((18 + i * 72) / 180) * Math.PI) * size + gridY + size / 2
          );
          ctx.lineTo(
            Math.cos(((54 + i * 72) / 180) * Math.PI) * (size / 2) +
              gridX +
              size / 2,
            -Math.sin(((54 + i * 72) / 180) * Math.PI) * (size / 2) +
              gridY +
              size / 2
          );
        }
        ctx.closePath();
        ctx.fill();
        break;
      default:
        ctx.fillRect(gridX, gridY, size, size);
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
