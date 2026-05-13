"use client";

import { createContext, useContext, useMemo, useState, type ReactNode, type RefObject } from "react";

type ScrollContainerContextValue = {
  scrollContainerRef: RefObject<HTMLElement | null> | null;
  setScrollContainerRef: (ref: RefObject<HTMLElement | null> | null) => void;
};

const ScrollContainerContext = createContext<ScrollContainerContextValue | undefined>(undefined);

export function ScrollContainerProvider({ children }: { children: ReactNode }) {
  const [scrollContainerRef, setScrollContainerRef] = useState<RefObject<HTMLElement | null> | null>(null);
  const value = useMemo(
    () => ({ scrollContainerRef, setScrollContainerRef }),
    [scrollContainerRef],
  );

  return (
    <ScrollContainerContext.Provider value={value}>
      {children}
    </ScrollContainerContext.Provider>
  );
}

export function useScrollContainerContext() {
  const context = useContext(ScrollContainerContext);
  if (!context) {
    throw new Error("useScrollContainerContext must be used within a ScrollContainerProvider");
  }
  return context;
}
