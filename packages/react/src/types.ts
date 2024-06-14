import type { RefObject } from "react";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Vector = Record<"x" | "y", number>;

/**
 * @description Use it for cleanup purposes, For a regular function use Func or FuncWithParams
 */
export type Callback = () => void;
/**
 * @param ReturnType Type of return value
 * @description Use FuncWithParams for functions that take parameters
 */
export type Func<ReturnType = void> = (...args: never[]) => ReturnType;
/**
 * @param ReturnType Type of the return value
 * @param ParamsType Type of the parameters inside an array
 */
export type FuncWithParams<ReturnType, ParamsType extends any[]> = (
  ...args: ParamsType
) => ReturnType;

export type RefTitle = string & ("container" | "glare");
export type Trackers = Prettify<Record<RefTitle, RefObject<any>>>;

/**
 * @description All API functions that are available with the hook
 */
export type APIMethods<T extends HTMLElement> = Prettify<{
  getAngle: FuncWithParams<number, [Vector]>;
  getProgress: FuncWithParams<number, [Vector, Vector, Vector]>;
  getContainer: Func<T>;
  getCenterPosition: Func<Vector>;
  getContainerPosition: Func<DOMRect>;
  getDistanceFromCenter: FuncWithParams<Vector, [Vector]>;
  getMinDistanceFromBoundary: FuncWithParams<number, [Vector]>;
}>;

export type Preset<T extends HTMLElement> = {
  title?: RefTitle;
  ref?: RefObject<T>;
  resonate: (api: Required<APIMethods<T>>) => Callback;
};
export type ResonateFN<T extends HTMLElement = HTMLDivElement> = (
  api: APIMethods<T>,
) => Callback;

export type EventKeys = keyof GlobalEventHandlersEventMap;
export type EventType<E extends EventKeys> = GlobalEventHandlersEventMap[E];
export type Listener<E extends EventKeys> = FuncWithParams<
  void,
  [EventType<E>]
>;

/**
 * @param api methods provided by the hook
 * @description return a object containing pair of event name and event listener
 */
export type CustomEventListener<ContainerType extends HTMLElement> = (
  api: APIMethods<ContainerType>,
) => Partial<{ [Event in EventKeys]: Listener<Event> }>;

/**
 * @description Entire configuration for the resonate hook
 * @param presets include desired presets and configure them
 * @param customEventListeners use custom event listeners seamlessly with the robust API
 */
export type Config<ContainerType extends HTMLElement> = Prettify<{
  presets: Preset<ContainerType>[];
  customEventListeners: CustomEventListener<ContainerType>;
}>;
