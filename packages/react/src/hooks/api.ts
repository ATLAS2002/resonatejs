import { RefObject } from "react";
import type { APIMethods } from "../types";

export const useAPI = <T extends HTMLElement>(
  container: RefObject<T>
): APIMethods<T> => {
  /**
   * @returns current container element
   */
  const getContainer: APIMethods<T>["getContainer"] = () =>
    container.current as T;

  const getContainerPosition: APIMethods<T>["getContainerPosition"] = () =>
    getContainer().getBoundingClientRect();

  const getCenterPosition = () => {
    const { x, y, width, height } = getContainerPosition();

    return {
      x: x + width / 2,
      y: y + height / 2,
    };
  };

  const getDistanceFromCenter: APIMethods<T>["getDistanceFromCenter"] = (
    pointer
  ) => {
    const elm = getContainerPosition();
    const left = pointer.x - elm.x;
    const top = pointer.y - elm.y;
    return {
      x: left - elm.width / 2,
      y: top - elm.height / 2,
    };
  };

  const getMinDistanceFromBoundary: APIMethods<T>["getMinDistanceFromBoundary"] =
    ({ x, y }) => {
      const { x: left, y: top, width, height } = getContainerPosition();

      return Math.min(x - left, y - top, left + width - x, top + height - y);
    };

  return {
    getContainer,
    getCenterPosition,
    getContainerPosition,
    getDistanceFromCenter,
    getMinDistanceFromBoundary,
  };
};
