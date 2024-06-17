import { EventManager } from "../lib/event-manager";
import type {
  Callback,
  Config,
  Trackers,
  Listener,
  EventKeys,
  APIMethods,
  FuncWithParams,
} from "../types";

type EventListener = [EventKeys, Listener<EventKeys>];

export const useConfig = <T extends HTMLElement>(
  api: Required<APIMethods<T>>,
  config: Partial<Config<T>>,
) => {
  /**
   * @param eventListeners collection of user defined event listeners
   * @returns methods to add and remove listeners
   */
  const applyCustomEventListeners = (
    eventListeners = config.customEventListeners,
  ) => {
    const eventManager = new EventManager();

    /**
     * @description adds all listeners
     * @param target the html element that all these listeners are being applied on
     */
    const addCustomEventListeners: FuncWithParams<void, [T]> = (target) => {
      if (!eventListeners) return;
      for (const eventListener of Object.entries(eventListeners(api))) {
        const [event, listener] = eventListener as EventListener;

        eventManager.addEvent(target, event, listener);
      }
    };
    /**
     * @description removes all listeners
     */
    const removeCustomEventListeners: Callback = () => {
      eventManager.executeAll();
    };

    return { addCustomEventListeners, removeCustomEventListeners };
  };

  const applyPresets = (presets = config.presets ?? []) => {
    const trackers: Partial<Trackers> = {};

    const presetManager = new EventManager();

    for (const { title, ref, resonate } of presets) {
      if (title && ref) trackers[title] = ref;
      presetManager.addFunction(() => resonate(api));
    }

    const activatePresets: Callback = () => {
      const cleanup: Function[] = presetManager.executeAll();
      presetManager.addFunction(cleanup);
    };

    const deactivatePresets: Callback = () => {
      presetManager.executeAll();
    };

    return {
      trackers,
      activatePresets,
      deactivatePresets,
    };
  };

  return {
    applyPresets,
    applyCustomEventListeners,
  };
};
