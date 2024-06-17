import React from "react";

export interface IContext {
  globalX: number;
  globalY: number;
  speedX: number;
  speedY: number;
  speed: number;
  direction: number;
  acceleration: number;
  present: boolean;
}

export const defaultValue: IContext = {
  globalX: 0,
  globalY: 0,
  speedX: 0,
  speedY: 0,
  speed: 0,
  direction: 0,
  acceleration: 0,
  present: false,
};

export const ResonateContext = React.createContext<IContext>(defaultValue);

export const useGlobal = () => React.useContext(ResonateContext);
