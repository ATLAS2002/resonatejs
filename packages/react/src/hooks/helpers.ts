import { OperationManager } from "../utils";
import type {
  Preset,
  Callback,
  Trackers,
  Listener,
  EventKeys,
  APIMethods,
  FuncWithParams,
  CustomEventListener,
} from "../types";

export const useConfig = <T extends HTMLElement>() => {
  /**
   * @param eventListeners collection of user defined event listeners
   * @returns methods to add and remove listeners
   */
  const applyCustomEventListeners = (
    eventListeners: CustomEventListener<T> | undefined,
    api: Required<APIMethods<T>>
  ) => {
    const eventManager = new OperationManager();

    /**
     * @description adds all listeners
     * @param target the html element that all these listeners are being applied on
     */
    const addCustomEventListeners: FuncWithParams<void, [T]> = (target) => {
      if (!eventListeners) return;
      for (const eventListener of Object.entries(eventListeners(api))) {
        const [event, listener] = eventListener as [
          EventKeys,
          Listener<EventKeys>,
        ];

        console.log(`Event: "${event}" is mounted`);
        target.addEventListener(event, listener);

        eventManager.addFunction(() => {
          console.log(`Event: "${event}" is unmounted`);
          target.removeEventListener(event, listener);
        });
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

  const applyPresets = (
    presets: Preset<T>[] = [],
    api: Required<APIMethods<T>>
  ) => {
    const trackers: Partial<Trackers> = {};

    const presetManager = new OperationManager();

    for (const { title, ref, resonate } of presets) {
      if (title && ref) trackers[`${title}`] = ref;
      presetManager.addFunction(() => resonate(api));
    }

    const activatePresets: Callback = () => {
      const cleanup: Function[] = presetManager.executeAll(true);
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
