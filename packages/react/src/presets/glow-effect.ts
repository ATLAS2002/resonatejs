import { useRef } from "react";
import { extractElementFromRef } from "../utils";
import { Attributes, Prettify } from "../types";

interface GlowConfig {
  highlight: string;
  fade: string;
  stay: boolean;
}

const baseConfig: Prettify<GlowConfig> = {
  highlight: "#ffffff55",
  fade: "#0000000f",
  stay: false,
};

export default function (configs: Prettify<Partial<GlowConfig>>) {
  const { highlight, fade, stay } = { ...baseConfig, ...configs };

  const glowRef = useRef<HTMLDivElement>(null);

  const resonate = ({ getPosition, getDistanceFromCenter }: Attributes) => {
    const glow = extractElementFromRef(glowRef);
    const elm = getPosition();

    const handleMouseMove = (evt: MouseEvent) => {
      const center = getDistanceFromCenter({
        mousePosition: {
          x: evt.clientX,
          y: evt.clientY,
        },
        elementPosition: {
          x: elm.x,
          y: elm.y,
          width: elm.width,
          height: elm.height,
        },
      });

      glow.style.background = `radial-gradient(
        circle at
        ${center.x + elm.width / 2}px
        ${center.y + elm.height / 2}px,
        ${highlight},
        ${fade}
      )`;
    };
    const handleMouseEnter = () => {
      glow.addEventListener("mousemove", handleMouseMove);
    };
    const handleMouseLeave = () => {
      if (stay === false) glow.style.background = "";
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
