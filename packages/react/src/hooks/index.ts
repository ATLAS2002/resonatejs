"use client";

import { useEffect, useRef } from "react";

import { useAPI } from "./api";
import { useConfig } from "./helpers";
import { extractElementFromRef } from "../utils";
import type { Config, Trackers } from "../types";

export const useResonate = <T extends HTMLElement = HTMLDivElement>(
  configs?: Partial<Config<T>>
): Partial<Trackers> => {
  const containerRef = useRef<T>(null);
  const api = useAPI<T>(containerRef);
  const { applyPresets, applyCustomEventListeners } = useConfig<T>();

  const { addCustomEventListeners, removeCustomEventListeners } =
    applyCustomEventListeners(configs?.customEventListeners);

  const { trackers, activatePresets, deactivatePresets } = applyPresets(
    configs?.presets,
    api
  );

  useEffect(() => {
    const container = extractElementFromRef(containerRef, "container");

    addCustomEventListeners(container);

    if (activatePresets) activatePresets();

    return () => {
      removeCustomEventListeners();

      if (deactivatePresets) deactivatePresets();
    };
  }, [containerRef]);

  return {
    ...trackers,
    container: containerRef,
  };
};
