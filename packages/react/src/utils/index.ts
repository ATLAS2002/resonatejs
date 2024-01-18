import { PositionMetrics } from "../types";

export * from "./ref";
export * from "./operation-manager";

export const calculateAngle = (
  entryPoint: PositionMetrics,
  basePoint: PositionMetrics,
  centerPoint: PositionMetrics
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

  const baseMagnitude = Math.sqrt(base.x ** 2 + base.y ** 2);
  const incomingMagnitude = Math.sqrt(incident.x ** 2 + incident.y ** 2);

  const cosine = dotProduct / (baseMagnitude * incomingMagnitude);
  return (Math.acos(cosine) * 180) / Math.PI;
};
