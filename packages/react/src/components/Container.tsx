import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes } from "react";
import type { Trackers } from "../types";

type JSXAttributes<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

interface Props<T> extends JSXAttributes<T> {
  children: any;
  trackers: Partial<Trackers>;
}

const baseStyle: Partial<CSSProperties> = {
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
export const ResonateContainer: FC<Props<HTMLDivElement>> = ({
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
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
      {trackers.glare && (
        <div
          ref={trackers.glare}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transition: "opacity 300ms",
            backgroundBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
};
