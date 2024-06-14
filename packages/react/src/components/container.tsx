import React from "react";
import type { Trackers } from "../types";

type JSXAttributes<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

interface Props<T> extends JSXAttributes<T> {
  children: React.ReactNode;
  trackers: Partial<Trackers>;
}

const baseStyle: Partial<React.CSSProperties> = {
  width: "100%",
  height: "100%",
  position: "relative",
  transformStyle: "preserve-3d",
  perspective: 4000,
};

/**
 * @param children
 * @param trackers - pass the object obtained from useResonate hook
 */
export const ResonateContainer: React.FC<Props<HTMLDivElement>> = ({
  children,
  trackers,
  ...props
}) => {
  return (
    <div
      ref={trackers.container}
      style={{
        ...baseStyle,
        ...props.style,
      }}
      {...props}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
      {trackers.glare && <Glare ref={trackers.glare} />}
    </div>
  );
};

export const Glare = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    style={{
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      position: "absolute",
      transition: "opacity 300ms",
      backgroundBlendMode: "overlay",
      overflow: "hidden",
      borderRadius: "inherit",
    }}
  />
));
