import { generateRef } from "../lib/utils";
import type { APIMethods, Preset, Prettify, ResonateFN } from "../types";

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
    getDistanceFromCenter,
  }) => {
    const elmPos = getContainerPosition();
    const glare = extractElementFromRef();

    const handleMouseMove = ({ x, y }: MouseEvent) => {
      const pointer = getDistanceFromCenter({ x, y });

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
