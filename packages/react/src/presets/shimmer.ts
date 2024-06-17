import { useRef } from "react";
import type { Preset, Prettify } from "../types";

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

const Shimmer: Preset<HTMLDivElement, ShimmerConfig> = (configs) => {
  const { highlight, shadow, angle, width, speed, offset, fade, stay } = {
    ...baseConfig,
    ...configs,
  };

  const glowRef = useRef<HTMLDivElement>(null);

  return {
    title: "glowLayer",
    ref: glowRef,
    resonate({ getAngle, getProgress, getCenterPosition }) {
      const glowLayer = glowRef.current!;
      let position: { x: number; y: number; angle: number };

      const handleMouseMove = ({ x, y }: MouseEvent) => {
        const progress = Math.round(
          getProgress({ x: position.x, y: position.y }, getCenterPosition(), {
            x,
            y,
          }) *
            100 *
            speed,
        );

        if (fade !== 0)
          glowLayer.style.opacity = `${1 - progress / (100 * fade)}`;

        glowLayer.style.background = `linear-gradient(
          ${position.angle}deg,
          ${shadow} ${progress - width / 2 + offset}%,
          ${highlight} ${progress + offset}%,
          ${shadow} ${progress + width / 2 + offset}%
        )`;
      };

      const handleMouseEnter = ({ x, y }: MouseEvent) => {
        glowLayer.style.opacity = "1";

        position = {
          x,
          y,
          angle: angle === "auto" ? getAngle({ x, y }) : angle,
        };

        glowLayer.addEventListener("mousemove", handleMouseMove);
        glowLayer.addEventListener("mouseleave", handleMouseLeave);
      };

      const handleMouseLeave = () => {
        if (stay === false) glowLayer.style.opacity = "0";

        glowLayer.removeEventListener("mousemove", handleMouseMove);
        glowLayer.removeEventListener("mouseleave", handleMouseLeave);
      };

      glowLayer.addEventListener("mouseenter", handleMouseEnter);

      return () => {};
    },
  };
};

export default Shimmer;
