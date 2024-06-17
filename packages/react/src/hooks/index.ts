import { useEffect, useRef } from "react";

import { useAPI } from "./api";
import { useConfig } from "./helpers";
import type { Config, Trackers } from "../types";

export const useResonate = <T extends HTMLElement = HTMLDivElement>(
  configs: Partial<Config<T>>,
): Partial<Trackers> => {
  const containerRef = useRef<T>(null);

  const api = useAPI<T>(containerRef);
  const { applyPresets, applyListeners } = useConfig(api, configs);

  const preset = applyPresets();

  const listener = applyListeners(() => containerRef.current);

  useEffect(() => {
    preset.activate();
    listener.activate();

    return () => {
      preset.deactivate();
      listener.deactivate();
    };
  }, []);

  return {
    ...preset.trackers,
    container: containerRef,
  };
};

export * from "./api";
export * from "./context";
