import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes } from "react";
import type { Trackers } from "../types";

type JSXAttributes<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

interface Props<T> extends JSXAttributes<T> {
  children: JSX.Element;
  trackers: Partial<Trackers>;
}

const baseStyle: Partial<CSSProperties> = {
  width: "100%",
  height: "100%",
  position: "relative",
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
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {children}
      </div>
      {trackers.glow && (
        <div
          ref={trackers.glow}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transition: "ease-in-out",
          }}
        />
      )}
    </div>
  );
};
