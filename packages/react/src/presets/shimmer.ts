import { generateRef } from "../lib/utils";
import type { APIMethods, Preset, Prettify, ResonateFN } from "../types";

interface ShimmerConfig {
  highlight: string;
  shadow: string;

  angle: number | "auto";
  width: number;

  speed: number;
  offset: number;

  fade: number;
  stay: boolean;
}

const baseConfig = {
  highlight: "#ffffff77",
  shadow: "transparent",
  angle: "auto",
  width: 120,
  speed: 1,
  offset: 0,
  fade: 0,
  stay: false,
} as const;

export default function (
  configs?: Prettify<Partial<ShimmerConfig>>,
): Preset<HTMLDivElement> {
  const { highlight, shadow, angle, width, speed, offset, fade, stay } = {
    ...baseConfig,
    ...configs,
  };

  const { refObj: glareRef, extractElementFromRef } =
    generateRef<HTMLDivElement>("glare");

  let position: { x: number; y: number; angle: number };

  const resonate: ResonateFN = ({
    getAngle,
    getProgress,
    getCenterPosition,
  }) => {
    const glare = extractElementFromRef();

    const handleMouseMove = ({ x, y }: MouseEvent) => {
      const progress = Math.round(
        getProgress({ x: position.x, y: position.y }, getCenterPosition(), {
          x,
          y,
        }) *
          100 *
          speed,
      );

      if (fade !== 0) glare.style.opacity = `${1 - progress / (100 * fade)}`;

      glare.style.background = `linear-gradient(
          ${position.angle}deg,
          ${shadow} ${progress - width / 2 + offset}%,
          ${highlight} ${progress + offset}%,
          ${shadow} ${progress + width / 2 + offset}%
        )`;
    };

    const handleMouseEnter = ({ x, y }: MouseEvent) => {
      glare.style.opacity = "1";

      position = {
        x,
        y,
        angle: angle === "auto" ? getAngle({ x, y }) : angle,
      };

      glare.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      if (stay === false) glare.style.opacity = "0";

      glare.removeEventListener("mousemove", handleMouseMove);
    };

    glare.addEventListener("mouseenter", handleMouseEnter);
    glare.addEventListener("mouseleave", handleMouseLeave);

    return () => {};
  };

  return {
    title: "glare",
    ref: glareRef,
    resonate,
  };
}
