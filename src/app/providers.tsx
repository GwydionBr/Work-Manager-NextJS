"use client";

import { NextUIProvider } from "@nextui-org/react";

interface PrioviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: PrioviderProps) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}