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
  tracker: Record<string, RefObject<T>>;
}

const baseStyle: Partial<CSSProperties> = {
  width: "fit-content",
  height: "fit-content",
  position: "relative",
};

/**
 *
 * @param children
 * @param tracker - pass the ref object obtained from useResonate hook
 */
export const ResonateWrapper: FC<Props<HTMLDivElement>> = ({
  children,
  tracker,
  ...props
}) => {
  return (
    <div
      ref={tracker.containerRef}
      style={{
        ...baseStyle,
        ...props.style,
      }}
      {...props}
    >
      <div className="absolute w-full h-full">{children}</div>
      <div
        ref={tracker.glowRef}
        className="bg-white h-full z-50 opacity-20 pointer-events-none absolute w-full"
      />
    </div>
  );
};
