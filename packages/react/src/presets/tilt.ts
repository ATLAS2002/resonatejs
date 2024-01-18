import type { APIMethods, Preset, Prettify } from "../types";

interface FloatConfig {
  shadowColor: string;
  shadowOffset: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

const baseConfig = {
  shadowColor: "#00000077",
  shadowOffset: 25,
} as const;

export default function (
  configs?: Prettify<Partial<FloatConfig>>
): Preset<HTMLDivElement> {
  const { shadowColor, shadowOffsetX, shadowOffsetY } = {
    ...baseConfig,
    shadowOffsetX: configs?.shadowOffset ?? baseConfig.shadowOffset,
    shadowOffsetY: configs?.shadowOffset ?? baseConfig.shadowOffset,
    ...configs,
  };

  const resonate = ({
    getContainer,
    getDistanceFromCenter,
  }: APIMethods<HTMLDivElement>) => {
    const container = getContainer();

    const handleMouseMove = ({ x, y }: MouseEvent) => {
      const pointer = getDistanceFromCenter({ x, y });
      const distance = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);

      container.style.transform = `rotate3d(
          ${pointer.y / 500},
          ${-pointer.x / 500},
          0,
          ${Math.log(distance) * 3}deg)
        `;

      container.style.filter = `drop-shadow(
          ${pointer.x / shadowOffsetX}px
          ${pointer.y / shadowOffsetY}px
          10px 
          ${shadowColor}
        )`;
    };

    const handleMouseEnter = () => {
      container.style.transition = "none";
      container.addEventListener("mousemove", handleMouseMove);
    };
    const handleMouseLeave = () => {
      container.style.transition = "transform 300ms, filter 300ms";
      container.style.transform = "";
      container.style.filter = "";
      container.removeEventListener("mousemove", handleMouseMove);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {};
  };

  return {
    resonate,
  };
}
