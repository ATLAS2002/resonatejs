import { generateRef } from "../lib/utils";
import type { Preset, Prettify, ResonateFN } from "../types";

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

export default function (
  configs?: Prettify<Partial<GlareConfig>>,
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
    stay,
  } = {
    ...baseConfig,
    speedX: configs?.speed ?? baseConfig.speed,
    speedY: configs?.speed ?? baseConfig.speed,
    offsetX: configs?.offset ?? baseConfig.offset,
    offsetY: configs?.offset ?? baseConfig.offset,
    ...configs,
  };

  const { refObj: glareRef, extractElementFromRef } =
    generateRef<HTMLDivElement>("glare");

  const resonate: ResonateFN = ({
    getContainerPosition,
    getRelativePositionFromCenter,
  }) => {
    const elmPos = getContainerPosition();
    const glare = extractElementFromRef();

    const handleMouseMove = ({ x, y }: MouseEvent) => {
      const pointer = getRelativePositionFromCenter({ x, y });

      glare.style.background = `radial-gradient(
        circle at
        ${pointer.x * speedX + elmPos.width / offsetX}px
        ${pointer.y * speedY + elmPos.height / offsetY}px,
        ${highlight} ${radius},
        ${shadow} ${dispersion}
      )`;
    };

    const handleMouseEnter = () => {
      if (stay === false) glare.style.opacity = "1";
      glare.addEventListener("mousemove", handleMouseMove);
      glare.addEventListener("mouseleave", handleMouseLeave);
    };
    const handleMouseLeave = () => {
      if (stay === false) glare.style.opacity = "0";
      glare.removeEventListener("mousemove", handleMouseMove);
      glare.removeEventListener("mouseleave", handleMouseLeave);
    };

    glare.addEventListener("mouseenter", handleMouseEnter);

    return () => {};
  };

  return {
    title: "glare",
    ref: glareRef,
    resonate,
  };
}
