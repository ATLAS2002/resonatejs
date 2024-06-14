"use client";

import { ResonateProvider } from "@resonatejs/react";
import type { FC, ReactNode } from "react";

export const Background: FC<{ children: ReactNode }> = ({ children }) => (
  <ResonateProvider>{children}</ResonateProvider>
);
