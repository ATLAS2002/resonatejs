import { RefObject } from "react";
import { calculateAngle } from "../utils";
import type { APIMethods, PositionMetrics } from "../types";

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
          { ...center }
        )
      ) + (center.x < entryPoint.x ? 180 : 0);
    return angle;
  };

  const getProgress: APIMethods<T>["getProgress"] = (
    start: PositionMetrics,
    center: PositionMetrics,
    curr: PositionMetrics
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
    // console.log(progress.x - start.x, progress.y - start.y);

    const totalDistance = calculateDistance(start, end);
    const coveredDistance = calculateDistance(start, progress);

    if (isFading(progress, start, end)) {
      console.log("working");
      return -coveredDistance / totalDistance;
    }
    return coveredDistance / totalDistance;
  };

  const calculateDistance = (
    a: PositionMetrics,
    b: PositionMetrics
  ): number => {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  };

  const isFading = (
    a: PositionMetrics,
    b: PositionMetrics,
    c: PositionMetrics
  ): boolean => {
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
  };
};
