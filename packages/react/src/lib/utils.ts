import type { Vector } from "../types";

export const calculateMagnitude = ({ x, y }: Vector) =>
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

  const baseMagnitude = calculateMagnitude(base);
  const incomingMagnitude = calculateMagnitude(incident);

  const cosine = dotProduct / (baseMagnitude * incomingMagnitude);
  return (Math.acos(cosine) * 180) / Math.PI;
};

export const getRelativePosition = (l: number, u: number, x: number) => {
  if (x >= l && x <= u) return 0;
  else if (x < l) return x - l;
  else return x - u;
};

export const getCyclicValue = (value: number, range: number) =>
  Math.round(value + range) % range;
