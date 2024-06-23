import type { Preset } from "../types";

interface TiltConfig {
  power: number;
  shadowColor: string;
  shadowOffset: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

const baseConfig = {
  power: 3,
  shadowColor: "#00000077",
  shadowOffset: 25,
} as const;

const Tilt: Preset<HTMLDivElement, TiltConfig> = (configs) => {
  const { power, shadowColor, shadowOffsetX, shadowOffsetY } = {
    ...baseConfig,
    shadowOffsetX: configs?.shadowOffset ?? baseConfig.shadowOffset,
    shadowOffsetY: configs?.shadowOffset ?? baseConfig.shadowOffset,
    ...configs,
  };

  return {
    resonate({ getContainer, getRelativePositionFromCenter }) {
      const container = getContainer();

      const handleMouseMove = ({ x, y }: MouseEvent) => {
        const pointer = getRelativePositionFromCenter({ x, y });
        const distance = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);

        container.style.transform = `rotate3d(
          ${pointer.y / 500},
          ${-pointer.x / 500},
          0,
          ${Math.log(distance) * power}deg)
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
        container.addEventListener("mouseleave", handleMouseLeave);
      };
      const handleMouseLeave = () => {
        container.style.transition = "transform 300ms, filter 300ms";
        container.style.transform = "";
        container.style.filter = "";
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };

      container.addEventListener("mouseenter", handleMouseEnter);

      return () => {};
    },
  };
};

export default Tilt;
