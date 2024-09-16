"use client";
import { HamburgerContext } from "@/types/Hamburger.type";
import React, { createContext, ReactNode, useContext, useState } from "react";

const ContextHamburger = createContext<HamburgerContext>({
  open: false,
  handleOpen: () => {},
});
export const useContextHamburger = () => {
  const ctx = useContext(ContextHamburger);
  if (!ctx) {
    throw new Error(
      "useContextHamburger has to be used within <ContextHamburger.Provider>"
    );
  }
  return ctx;
};
const HamburgerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const ctx = {
    open,
    handleOpen,
  };
  return (
    <ContextHamburger.Provider value={ctx}>
      {children}
    </ContextHamburger.Provider>
  );
};

export default HamburgerProvider;
