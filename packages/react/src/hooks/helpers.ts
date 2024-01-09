import { RefObject, useCallback } from "react";
import type { Attributes, Config } from "../types";

export const useUtils = <T extends HTMLElement>() => {
  const addCustomEventListeners = useCallback(
    (
      eventListeners: ReturnType<Config["customEventListeners"]> | undefined,
      target: T
    ) => {
      if (!eventListeners) return;
      for (const [event, listener] of Object.entries(eventListeners)) {
        console.log(`Event: "${event}" is mounted`);
        target.addEventListener(event, listener);
      }
    },
    []
  );

  const removeCustomEventListeners = useCallback(
    (
      eventListeners: ReturnType<Config["customEventListeners"]> | undefined,
      target: T
    ) => {
      if (!eventListeners) return;
      for (const [event, listener] of Object.entries(eventListeners)) {
        console.log(`Event: "${event}" is unmounted`);
        target.removeEventListener(event, listener);
      }
    },
    []
  );

  const activatePresets = (presetConfigs?: Config["presets"]) => {
    if (!presetConfigs || presetConfigs.length === 0) {
      return {};
    }
    for (const presetConfig of presetConfigs) {
      console.log(presetConfig);
    }

    return {
      trackers: {},
      deactivate: () => {},
    };
  };

  return {
    addCustomEventListeners,
    removeCustomEventListeners,
    activatePresets,
  };
};

export const useAttributes = <T extends HTMLElement>(
  tracker: RefObject<T>
): Required<Attributes> => {
  const getPosition: Attributes["getPosition"] = () => {
    return tracker.current!.getBoundingClientRect();
  };

  const getCenter: Attributes["getCenter"] = ({
    mousePosition,
    elementPosition,
  }) => {
    const left = mousePosition.x - elementPosition.x;
    const top = mousePosition.y - elementPosition.y;
    return {
      x: left - elementPosition.width / 2,
      y: top - elementPosition.height / 2,
    };
  };

  return {
    getPosition,
    getCenter,
  };
};
