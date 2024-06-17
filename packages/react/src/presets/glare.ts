import { useRef } from "react";
import type { Preset, Prettify } from "../types";

interface GlareConfig {
  highlight: string;
  shadow: string;

  speed: number;
  speedX: number;
  speedY: number;

  offset: number;
  offsetX: number;
  offsetY: number;

  radius: string;
  dispersion: string;

  duration: number;
  stay: boolean;
}

const baseConfig = {
  highlight: "#ffffff77",
  shadow: "transparent",
  speed: 1,
  offset: 2,
  radius: "0",
  dispersion: "100%",
  stay: false,
} as const;

const Glare: Preset<HTMLDivElement, GlareConfig> = (configs) => {
  const {
    highlight,
    shadow,
    speedX,
    speedY,
    offsetX,
    offsetY,
    radius,
    dispersion,
    stay,
  } = {
    ...baseConfig,
    speedX: configs?.speed ?? baseConfig.speed,
    speedY: configs?.speed ?? baseConfig.speed,
    offsetX: configs?.offset ?? baseConfig.offset,
    offsetY: configs?.offset ?? baseConfig.offset,
    ...configs,
  };

  const glowRef = useRef<HTMLDivElement>(null);

  return {
    title: "glowLayer",
    ref: glowRef,
    resonate({ getContainerPosition, getRelativePositionFromCenter }) {
      const elmPos = getContainerPosition();
      const glowLayer = glowRef.current!;

      const handleMouseMove = ({ x, y }: MouseEvent) => {
        const pointer = getRelativePositionFromCenter({ x, y });

        glowLayer.style.background = `radial-gradient(
        circle at
        ${pointer.x * speedX + elmPos.width / offsetX}px
        ${pointer.y * speedY + elmPos.height / offsetY}px,
        ${highlight} ${radius},
        ${shadow} ${dispersion}
      )`;
      };

      const handleMouseEnter = () => {
        if (stay === false) glowLayer.style.opacity = "1";
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

export default Glare;
