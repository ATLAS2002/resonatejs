"use client";

import { RefObject, useEffect, useRef } from "react";
import { useAttributes, useUtils } from "./helpers";
import { Attributes, Config } from "../types";
import { extractElementFromRef } from "../utils";

export const useResonate = <T extends HTMLElement = HTMLDivElement>(
  configs?: Partial<Config>
): Record<string, RefObject<T>> => {
  const containerRef = useRef<T>(null);
  const { getPosition, getDistanceFromCenter } = useAttributes<T>(containerRef);
  const { usePresets, addCustomEventListeners, removeCustomEventListeners } =
    useUtils<T>();

  const attributes: Attributes = {
    getPosition,
    getDistanceFromCenter,
  };

  const { trackers, activatePresets, deactivatePresets } = usePresets(
    configs?.presets,
    attributes
  );

  useEffect(() => {
    const container = extractElementFromRef(containerRef);

    addCustomEventListeners(
      configs?.customEventListeners
        ? configs.customEventListeners(attributes)
        : undefined,
      container
    );

    if (activatePresets) activatePresets();

    return () => {
      removeCustomEventListeners(
        configs?.customEventListeners
          ? configs.customEventListeners(attributes)
          : undefined,
        container
      );

      if (deactivatePresets) deactivatePresets();
    };
  }, [containerRef]);

  return {
    ...trackers,
    container: containerRef,
  };
};
