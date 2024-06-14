import React from "react";
import { defaultValue, ResonateContext, type IContext } from "../hooks";

enum ActionTypes {
  MOVE = "MOVE",
  ENTER = "ENTER",
  LEAVE = "LEAVE",
}

type Action =
  | {
      type: ActionTypes.MOVE;
      payload: Record<"globalX" | "globalY", number>;
    }
  | {
      type: ActionTypes.ENTER | ActionTypes.LEAVE;
    };

const reducer = (state: IContext, action: Action): IContext => {
  switch (action.type) {
    case ActionTypes.MOVE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.ENTER:
      return {
        ...state,
        present: true,
      };
    case ActionTypes.LEAVE:
      return {
        ...state,
        present: false,
      };
    default:
      return state;
  }
};

export const ResonateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pos, dispatch] = React.useReducer(reducer, defaultValue);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const elm = ref.current!;

    elm.addEventListener("mousemove", ({ clientX, clientY }) => {
      dispatch({
        type: ActionTypes.MOVE,
        payload: { globalX: clientX, globalY: clientY },
      });
    });

    elm.addEventListener("mouseenter", () => {
      dispatch({ type: ActionTypes.ENTER });
    });

    elm.addEventListener("mouseleave", () => {
      dispatch({ type: ActionTypes.LEAVE });
    });

    return () => {
      elm.removeEventListener("mouseenter", () => {});
      elm.removeEventListener("mousemove", () => {});
      elm.removeEventListener("mouseleave", () => {});
    };
  }, [pos]);

  return (
    <ResonateContext.Provider value={pos}>
      <main ref={ref}>{children}</main>
    </ResonateContext.Provider>
  );
};
