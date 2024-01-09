import { useRef } from "react";
import { extractElementFromRef } from "../utils";
import { Attributes } from "../types";

interface GlowProps {
  highlight: string;
  fade: string;
}

export default function (props?: GlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  const resonate = ({ getPosition, getCenter }: Required<Attributes>) => {
    const glow = extractElementFromRef(glowRef);
    const elm = getPosition();

    const handleMove = (evt: MouseEvent) => {
      const center = getCenter({
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

      glow.style.display = "block";
      glow.style.backgroundImage = `
        circle at
        ${center.x * 2 + elm.width / 2}px
        ${center.y * 2 + elm.height / 2}px,
        ${props?.highlight ?? "#ffffff55"},
        ${props?.fade ?? "#0000000f"}
      `;
    };
    glow.addEventListener("mousemove", handleMove);

    return () => {
      glow.removeEventListener("mousemove", handleMove);
    };
  };

  return {
    ref: glowRef,
    resonate,
  };
}
