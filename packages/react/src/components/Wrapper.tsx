import {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  RefObject,
} from "react";

type JSXAttributes<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

interface Props<T> extends JSXAttributes<T> {
  children: JSX.Element;
  trackers: Record<string, RefObject<T>>;
}

const baseStyle: Partial<CSSProperties> = {
  width: "fit-content",
  height: "fit-content",
  position: "relative",
};

/**
 * @param children
 * @param trackers - pass the ref object obtained from useResonate hook
 */
export const ResonateWrapper: FC<Props<HTMLDivElement>> = ({
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
          }}
        />
      )}
    </div>
  );
};
