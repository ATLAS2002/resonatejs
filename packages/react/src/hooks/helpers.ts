import { EventManager } from "../lib/event-manager";
import type {
  Callback,
  Config,
  Trackers,
  ListenerFn,
  EventKeys,
  APIMethods,
  Func,
} from "../types";

type EventListener = [EventKeys, ListenerFn<EventKeys>];

export const useConfig = <T extends HTMLElement>(
  api: Required<APIMethods<T>>,
  config: Partial<Config<T>>,
) => {
  const applyPresets = () => {
    const presets = config.presets ?? [];
    const trackers: Partial<Trackers> = {};

    const presetManager = new EventManager();

    for (const { title, ref, resonate } of presets) {
      if (title && ref) trackers[title] = ref;
      presetManager.addFunction(() => resonate(api));
    }

    const activate = () => {
      const cleanup: Function[] = presetManager.executeAll();
      presetManager.addFunction(cleanup);
    };

    const deactivate = () => {
      presetManager.executeAll();
    };

    return {
      trackers,
      activate,
      deactivate,
    };
  };

  const applyListeners = (getTarget: Func<T | null>) => {
    const eventManager = new EventManager();

    const activate = () => {
      const target = getTarget();
      if (!config.listeners || !target) return;

      for (const eventListener of Object.entries(config.listeners(api))) {
        const [event, listener] = eventListener as EventListener;

        eventManager.addEvent(target, event, listener);
      }
    };

    const deactivate = () => {
      eventManager.executeAll();
    };

    return { activate, deactivate };
  };

  return {
    applyPresets,
    applyListeners,
  };
};
