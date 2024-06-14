import React from "react";

export interface IContext {
  globalX: number;
  globalY: number;
  present: boolean;
}

export const defaultValue: IContext = {
  globalX: 0,
  globalY: 0,
  present: false,
};

export const ResonateContext = React.createContext<IContext>(defaultValue);

export const useGlobal = () => React.useContext(ResonateContext);
