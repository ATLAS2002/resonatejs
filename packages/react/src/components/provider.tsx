import React from "react";
import { defaultValue, ResonateContext, type IContext } from "../hooks";
import { calculateMagnitude, getCyclicValue } from "../lib/utils";
import { EventManager } from "../lib/event-manager";
import type { Vector } from "../types";

interface PrevState extends Vector {
  speed: number;
  time: number;
}

enum ACTION {
  SET_POSITION = "POSITION",
  SET_MOVEMENT = "MOVEMENT",
  ENTER = "ENTER",
  LEAVE = "LEAVE",
}

type Action =
  | {
      type: ACTION;
      payload: Partial<IContext>;
    }
  | { type: ACTION.ENTER | ACTION.LEAVE };

const reducer = (state: IContext, action: Action): IContext => {
  switch (action.type) {
    case ACTION.SET_POSITION:
    case ACTION.SET_MOVEMENT:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION.ENTER:
      return {
        ...state,
        present: true,
      };
    case ACTION.LEAVE:
      return {
        ...state,
        present: false,
      };
    default:
      return state;
  }
};

const RAD_TO_DEG = 180 / Math.PI;

export const ResonateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [pos, dispatch] = React.useReducer(reducer, defaultValue);
  const [prev, setPrev] = React.useState<PrevState>({
    x: 0,
    y: 0,
    speed: 0,
    time: 0,
  });

  const eventManager = new EventManager();

  React.useEffect(() => {
    const elm = ref.current!;

    const handleCursor = (time: number) => {
      const dt = time - prev.time;
      const dx = pos.globalX - prev.x;
      const dy = pos.globalY - prev.y;

      const speedX = Math.abs(dx) / dt;
      const speedY = Math.abs(dy) / dt;
      const speed = calculateMagnitude({ x: dx, y: dy }) / dt;

      const direction = getCyclicValue(Math.atan2(dy, dx) * RAD_TO_DEG, 360);
      const acceleration = Math.abs(speed - prev.speed) / dt;

      dispatch({
        type: ACTION.SET_MOVEMENT,
        payload: {
          speed,
          speedX,
          speedY,
          direction,
          acceleration,
        },
      });
      setPrev({
        x: pos.globalX,
        y: pos.globalY,
        speed: pos.speed,
        time,
      });
      requestAnimationFrame(handleCursor);
    };
    const handleMouseEnter = () => {
      dispatch({ type: ACTION.ENTER });
    };
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      dispatch({
        type: ACTION.SET_POSITION,
        payload: {
          globalX: clientX,
          globalY: clientY,
        },
      });
    };
    const handleMouseLeave = () => {
      dispatch({ type: ACTION.LEAVE });
    };

    requestAnimationFrame(handleCursor);
    eventManager.addEvent(elm, "mouseenter", handleMouseEnter);
    eventManager.addEvent(elm, "mousemove", handleMouseMove);
    eventManager.addEvent(elm, "mouseleave", handleMouseLeave);

    return () => {
      eventManager.executeAll();
    };
  }, [pos]);

  return (
    <ResonateContext.Provider value={pos}>
      <main ref={ref}>{children}</main>
    </ResonateContext.Provider>
  );
};
