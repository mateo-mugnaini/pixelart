"use client";
import React, { createContext, useState, useContext, useRef } from "react";

const GlobalContext = createContext();

export const MyProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
  });

  // Estado del color y transparencia
  const [color, setColor] = useState("black");
  const [transparency, setTransparency] = useState(1);

  const [brushType, setBrushType] = useState("default");

  const [pixelSize, setPixelSize] = useState(20);

  // Referencias a los lienzos
  const canvasRef = useRef(null); // Lienzo visible
  const hiddenCanvasRef = useRef(null); // Lienzo oculto

  return (
    <GlobalContext.Provider
      value={{
        userLogin,
        setUserLogin,
        userRegister,
        setUserRegister,
        color,
        setColor,
        transparency,
        setTransparency,
        pixelSize,
        setPixelSize,
        canvasRef,
        hiddenCanvasRef,
        brushType,
        setBrushType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
