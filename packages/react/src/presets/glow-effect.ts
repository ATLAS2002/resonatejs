import { useRef } from "react";
import { extractElementFromRef } from "../utils";
import { APIMethods, Preset, Prettify } from "../types";

interface GlowConfig {
  highlight: string;
  shadow: string;
  speedX: number;
  speedY: number;
  offsetX: number;
  offsetY: number;
  radius: string;
  dispersion: string;
  behavior: "smooth" | "default";
  stay: boolean;
}

const baseConfig: GlowConfig = {
  highlight: "#ffffff77",
  shadow: "transparent",
  speedX: 1,
  speedY: 1,
  offsetX: 2,
  offsetY: 2,
  radius: "0",
  dispersion: "100%",
  behavior: "default",
  stay: false,
};

export default function (
  configs?: Prettify<Partial<GlowConfig>>
): Preset<HTMLDivElement> {
  const {
    highlight,
    shadow,
    speedX,
    speedY,
    offsetX,
    offsetY,
    radius,
    dispersion,
    behavior,
    stay,
  } = {
    ...baseConfig,
    ...configs,
  };

  const glowRef = useRef<HTMLDivElement>(null);

  const resonate = ({
    getContainerPosition,
    getDistanceFromCenter,
    getMinDistanceFromBoundary,
  }: APIMethods<HTMLDivElement>) => {
    const glow = extractElementFromRef(glowRef, "glow");
    const elm = getContainerPosition();

    const handleMouseMove = ({ x, y }: MouseEvent) => {
      const pointer = getDistanceFromCenter({ x, y });

      if (behavior === "smooth") {
        const opacity = Math.max(
          0.2,
          getMinDistanceFromBoundary({ x, y }) / 100
        );
        glow.style.opacity = `${opacity}`;
      }

      glow.style.background = `radial-gradient(
        circle at
        ${pointer.x * speedX + elm.width / offsetX}px
        ${pointer.y * speedY + elm.height / offsetY}px,
        ${highlight} ${radius},
        ${shadow} ${dispersion}
      )`;
    };
    const handleMouseEnter = () => {
      glow.addEventListener("mousemove", handleMouseMove);
    };
    const handleMouseLeave = () => {
      if (stay === false) glow.style.background = "transparent";
      glow.removeEventListener("mousemove", handleMouseMove);
    };

    glow.addEventListener("mouseenter", handleMouseEnter);
    glow.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      glow.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  return {
    title: "glow",
    ref: glowRef,
    resonate,
  };
}
