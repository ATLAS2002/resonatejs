import { RefObject } from "react";

/* eslint-disable no-unused-vars */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type PositionMetrics<T extends string = never> = Record<
  T | "x" | "y",
  number
>;

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

export type RefTitle = string & ("container" | "glow");
export type Trackers = Prettify<Record<RefTitle, RefObject<any>>>;

/**
 * @description All API functions that are available with the hook
 */
export type APIMethods<T extends HTMLElement> = Prettify<{
  getContainer: Func<T>;
  getCenterPosition: Func<PositionMetrics>;
  getContainerPosition: Func<DOMRect>;
  getDistanceFromCenter: FuncWithParams<PositionMetrics, [PositionMetrics]>;
  getMinDistanceFromBoundary: FuncWithParams<number, [PositionMetrics]>;
}>;

export interface Preset<T extends HTMLElement> {
  title: RefTitle;
  ref: RefObject<T>;
  resonate: (api: Required<APIMethods<T>>) => Callback;
}

export type EventKeys = keyof GlobalEventHandlersEventMap;
export type EventType<E extends EventKeys> = GlobalEventHandlersEventMap[E];
export type Listener<E extends EventKeys> = FuncWithParams<
  void,
  [EventType<E>]
>;

export type CustomEventListener<ContainerType extends HTMLElement> = (
  api: APIMethods<ContainerType>
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
