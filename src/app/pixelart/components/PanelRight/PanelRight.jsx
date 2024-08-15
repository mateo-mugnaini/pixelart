"use client";
import React from "react";
import { useGlobalContext } from "@/context/globalContext";
import style from "./PanelRight.module.css";

import Icon from "@mdi/react";
import { mdiContentCopy, mdiFileJpgBox, mdiFilePngBox } from "@mdi/js";

const PanelRight = () => {
  const {
    color,
    setColor,
    transparency,
    setTransparency,
    pixelSize,
    setPixelSize,
    brushType,
    setBrushType,
    canvasRef,
  } = useGlobalContext();

  const updateHiddenCanvas = () => {
    const canvas = canvasRef.current;
    const hiddenCanvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const hiddenCtx = hiddenCanvas.getContext("2d");

    hiddenCanvas.width = canvas.width;
    hiddenCanvas.height = canvas.height;

    // Copiar el contenido del lienzo visible al oculto
    hiddenCtx.drawImage(canvas, 0, 0);

    return hiddenCanvas;
  };

  const handleDownload = (format) => {
    const hiddenCanvas = updateHiddenCanvas();
    const link = document.createElement("a");
    link.download = `imagen.${format}`;
    link.href = hiddenCanvas.toDataURL(`image/${format}`);
    link.click();
  };

  const handleCopyToClipboard = () => {
    const hiddenCanvas = updateHiddenCanvas();
    hiddenCanvas.toBlob((blob) => {
      const data = new ClipboardItem({ [blob.type]: blob });
      navigator.clipboard.write([data]).then(
        () => {
          alert("Imagen copiada al portapapeles");
        },
        (error) => {
          console.error("Error al copiar al portapapeles", error);
        }
      );
    });
  };

  const brushTypes = ["default", "circle", "square", "triangle", "star"];

  return (
    <div className={style.ContenedorGeneral}>
      <label className={style.SubContenedor}>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={style.ColorInput}
        />
      </label>
      <label className={style.SubContenedor}>
        Transparencia:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={transparency}
          onChange={(e) => setTransparency(e.target.value)}
          className={style.RangeInput}
        />
      </label>
      <label className={style.SubContenedor}>
        Tamaño del Píxel:
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={pixelSize}
          onChange={(e) => setPixelSize(Number(e.target.value))}
          className={style.RangeInput}
        />
        <span className={style.PixelSize}>{pixelSize}</span>
      </label>
      <label className={style.SubContenedor}>
        Tipo de Pincel:
        <select
          value={brushType}
          onChange={(e) => setBrushType(e.target.value)}
          className={style.BrushTypeSelect}
        >
          {brushTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <div className={style.DownloadSection}>
        <h2>Descargar</h2>
        <div className={style.ContenedorBtns}>
          <Icon
            className={style.DownloadButton}
            onClick={() => handleDownload("png")}
            path={mdiFilePngBox}
            size={2}
          />
          <Icon
            className={style.DownloadButton}
            onClick={() => handleDownload("jpeg")}
            path={mdiFileJpgBox}
            size={2}
          />
          <Icon
            className={style.DownloadButton}
            onClick={handleCopyToClipboard}
            path={mdiContentCopy}
            size={2}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelRight;
