"use client";

import { RefObject, useEffect, useRef } from "react";
import { useAttributes, useUtils } from "./helpers";
import { Attributes, Config } from "../types";
import { extractElementFromRef } from "../utils";

export const useResonate = <T extends HTMLElement = HTMLDivElement>(
  configs?: Partial<Config>
): Record<string, RefObject<T>> => {
  const containerRef = useRef<T>(null);
  const { getPosition, getCenter } = useAttributes<T>(containerRef);
  const {
    addCustomEventListeners,
    removeCustomEventListeners,
    activatePresets,
  } = useUtils<T>();

  const attributes: Attributes = {
    getPosition,
    getCenter,
  };

  let trackers = { containerRef };

  useEffect(() => {
    const wrapper = extractElementFromRef(containerRef);

    addCustomEventListeners(
      configs?.customEventListeners
        ? configs.customEventListeners(attributes)
        : undefined,
      wrapper
    );

    const { trackers: componentTrackers, deactivate: deactivatePresets } =
      activatePresets(configs?.presets);
    trackers = {
      ...trackers,
      ...componentTrackers,
    };

    return () => {
      removeCustomEventListeners(
        configs?.customEventListeners
          ? configs.customEventListeners(attributes)
          : undefined,
        wrapper
      );

      if (deactivatePresets) deactivatePresets();
    };
  }, [containerRef]);

  return trackers;
};
