"use client";

import { useEffect } from "react";

import { useAPI } from "./api";
import { useConfig } from "./helpers";
import { generateRef } from "../lib/utils";
import type { Config, Trackers } from "../types";

export const useResonate = <T extends HTMLElement = HTMLDivElement>(
  configs?: Partial<Config<T>>,
): Partial<Trackers> => {
  const { refObj: containerRef, extractElementFromRef } =
    generateRef<T>("container");

  const api = useAPI<T>(containerRef);
  const { applyPresets, applyCustomEventListeners } = useConfig<T>();

  const { addCustomEventListeners, removeCustomEventListeners } =
    applyCustomEventListeners(configs?.customEventListeners, api);

  const { trackers, activatePresets, deactivatePresets } = applyPresets(
    configs?.presets,
    api,
  );

  useEffect(() => {
    const container = extractElementFromRef();

    activatePresets();

    addCustomEventListeners(container);

    return () => {
      deactivatePresets();

      removeCustomEventListeners();
    };
  }, []);

  return {
    ...trackers,
    container: containerRef,
  };
};

export * from "./api";
export * from "./context";
