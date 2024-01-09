import { RefObject } from "react";

/* eslint-disable no-unused-vars */
type Callback = () => void;

type EventKeys = keyof HTMLElementEventMap;

type PositionMetrics = Record<"x" | "y" | "width" | "height", number>;

export interface Attributes {
  getPosition: () => DOMRect;
  getCenter?: (metrics: {
    elementPosition: PositionMetrics;
    mousePosition: Pick<PositionMetrics, "x" | "y">;
  }) => Pick<PositionMetrics, "x" | "y">;
}

export interface Config {
  presets: {
    ref: RefObject<HTMLDivElement>;
    resonate: (attr: Required<Attributes>) => Callback;
  }[];
  customEventListeners: (
    attr: Attributes
  ) => Partial<Record<EventKeys, EventListener>>;
}
