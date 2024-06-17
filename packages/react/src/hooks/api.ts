import type { RefObject } from "react";
import {
  calculateAngle,
  calculateMagnitude,
  getRelativePosition,
} from "../lib/utils";
import type { APIMethods, Vector } from "../types";

export const useAPI = <T extends HTMLElement>(
  container: RefObject<T>,
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
    pointer,
  ) => {
    const { x, y } = getRelativePositionFromCenter(pointer);
    return calculateMagnitude({ x, y });
  };

  const getRelativePositionFromCenter: APIMethods<T>["getRelativePositionFromCenter"] =
    (pointer: Vector) => {
      const center = getCenterPosition();
      return {
        x: pointer.x - center.x,
        y: pointer.y - center.y,
      };
    };

  const getRelativePositionFromBoundary: APIMethods<T>["getRelativePositionFromBoundary"] =
    (pointer) => {
      const { left, top, right, bottom } = getContainerPosition();

      return {
        x: getRelativePosition(left, right, pointer.x),
        y: getRelativePosition(top, bottom, pointer.y),
      };
    };

  const getMinDistanceFromBoundary: APIMethods<T>["getMinDistanceFromBoundary"] =
    ({ x, y }) => {
      const { left, top, right, bottom } = getContainerPosition();

      return Math.min(x - left, y - top, right - x, bottom - y);
    };

  const getAngle: APIMethods<T>["getAngle"] = (entryPoint) => {
    const center = getCenterPosition();
    const { x, y, width, height } = getContainerPosition();
    const angle =
      Math.round(
        calculateAngle(
          { x: entryPoint.x, y: entryPoint.y },
          {
            x: x + width / 2,
            y: center.x < entryPoint.x ? y : y + height,
          },
          { ...center },
        ),
      ) + (center.x < entryPoint.x ? 180 : 0);
    return angle;
  };

  const getProgress: APIMethods<T>["getProgress"] = (
    start: Vector,
    center: Vector,
    curr: Vector,
  ) => {
    const end = {
      x: 2 * center.x - start.x,
      y: 2 * center.y - start.y,
    };

    const incidentSlope = (end.y - start.y) / (end.x - start.x);
    const perpendicularSlope = -1 / incidentSlope;
    const yIntercept = curr.y - perpendicularSlope * curr.x;

    const progressX = (curr.y - yIntercept) / perpendicularSlope;
    const progressY = perpendicularSlope * progressX + yIntercept;
    const progress = { x: progressX, y: progressY };

    const totalDistance = calculateDistance(start, end);
    const coveredDistance = calculateDistance(start, progress);

    if (isFading(progress, start, end)) {
      return -coveredDistance / totalDistance;
    }
    return coveredDistance / totalDistance;
  };

  const calculateDistance = (a: Vector, b: Vector): number => {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  };

  const isFading = (a: Vector, b: Vector, c: Vector): boolean => {
    if (b.x <= c.x && b.y <= c.y) return a.x <= b.x && a.y <= b.y;
    if (b.x > c.x && b.y < c.y) return a.x >= b.x && a.y < b.y;
    if (b.x <= c.x && b.y > c.y) return a.x <= b.x && a.y > b.y;
    return a.x > b.x && a.y > b.y;
  };

  return {
    getAngle,
    getProgress,
    getContainer,
    getCenterPosition,
    getContainerPosition,
    getDistanceFromCenter,
    getMinDistanceFromBoundary,
    getRelativePositionFromCenter,
    getRelativePositionFromBoundary,
  };
};
