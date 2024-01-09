import { type RefObject, useCallback } from "react";
import type { Attributes, Config, Func, Trackers } from "../types";
import { Executor } from "../utils";

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

  const usePresets = (
    presetConfigs: Config["presets"] = [],
    attributes: Required<Attributes>
  ) => {
    if (presetConfigs.length === 0) {
      return {};
    }

    const executor = new Executor();
    const trackers: Trackers = {};

    for (const { title, ref, resonate } of presetConfigs) {
      trackers[`${title}`] = ref;
      executor.addFunction(() => resonate(attributes));
    }

    let deactivatePresets: Func | undefined;
    const activatePresets = () => {
      const cleanups = executor.executeAll();

      deactivatePresets = () => {
        for (const cleanup of cleanups) {
          cleanup();
        }
      };
    };

    return {
      trackers,
      activatePresets,
      deactivatePresets,
    };
  };

  return {
    usePresets,
    addCustomEventListeners,
    removeCustomEventListeners,
  };
};

export const useAttributes = <T extends HTMLElement>(
  tracker: RefObject<T>
): Attributes => {
  const getPosition: Attributes["getPosition"] = () => {
    return tracker.current!.getBoundingClientRect();
  };

  const getDistanceFromCenter: Attributes["getDistanceFromCenter"] = ({
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
    getDistanceFromCenter,
  };
};
