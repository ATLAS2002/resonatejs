import { useRef } from "react";
import type { Vector } from "../types";

export const generateRef = <T>(title?: string) => {
  const refObj = useRef<T>(null);

  return {
    refObj,
    extractElementFromRef: (throwErr = true): T | never => {
      const elm = refObj.current;
      if (!elm && throwErr === true) {
        const errorMessage = String.raw`Inject the ref object${
          title ? ": " + title + "," : ""
        } to the proper component`;

        throw new Error(errorMessage);
      }

      return elm as T;
    },
  };
};

export const calculateDistance = ({ x, y }: Vector) =>
  Math.sqrt(x ** 2 + y ** 2);

export const calculateAngle = (
  entryPoint: Vector,
  basePoint: Vector,
  centerPoint: Vector,
): number => {
  const base = {
    x: basePoint.x - centerPoint.x,
    y: basePoint.y - centerPoint.y,
  };
  const incident = {
    x: entryPoint.x - centerPoint.x,
    y: entryPoint.y - centerPoint.y,
  };

  const dotProduct = base.x * incident.x + base.y * incident.y;

  const baseMagnitude = calculateDistance(base);
  const incomingMagnitude = calculateDistance(incident);

  const cosine = dotProduct / (baseMagnitude * incomingMagnitude);
  return (Math.acos(cosine) * 180) / Math.PI;
};

export const getRelativePosition = (l: number, u: number, x: number) => {
  if (x >= l && x <= u) return 0;
  else if (x < l) return x - l;
  else return x - u;
};
