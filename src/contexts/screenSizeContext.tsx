'use client';
import React, { createContext, useState, useEffect, ReactNode } from "react";

type ScreenSize = "mobil" | "table" | "desk";

interface ScreenSizeContextType {
  screenSize: ScreenSize;
}

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

export const useScreenSizeContext = (): ScreenSizeContextType => {
  const context = React.useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSizeContext must be used within a ScreenSizeProvider");
  }
  return context;
};

export const ScreenSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desk");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenSize("mobil");
      } else if (width < 1280) {
        setScreenSize("table");
      } else {
        setScreenSize("desk");
      }
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ screenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
