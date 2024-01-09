import { RefObject } from "react";

/* eslint-disable no-unused-vars */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type EventKeys = keyof HTMLElementEventMap;
type PositionMetrics = Record<"x" | "y" | "width" | "height", number>;

export type Callback = () => void;
export type Func<T = void> = (...args: never[]) => T;
export type Trackers = Prettify<
  Record<string, RefObject<HTMLElement | HTMLDivElement>>
>;

export type Attributes = Prettify<{
  getPosition: () => DOMRect;
  getDistanceFromCenter: (metrics: {
    elementPosition: PositionMetrics;
    mousePosition: Pick<PositionMetrics, "x" | "y">;
  }) => Pick<PositionMetrics, "x" | "y">;
}>;

export type Config = Prettify<{
  presets: {
    title: string;
    ref: RefObject<HTMLDivElement>;
    resonate: (attr: Required<Attributes>) => Callback;
  }[];
  customEventListeners: (
    attr: Attributes
  ) => Partial<Record<EventKeys, EventListener>>;
}>;
