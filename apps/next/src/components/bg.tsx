"use client";

import { ResonateProvider } from "@resonatejs/react";
import {
  useRef,
  createContext,
  type FC,
  type ReactNode,
  RefObject,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Cursor } from "./cursor";

interface IContext {
  cursorRef: RefObject<HTMLDivElement> | null;
  showLink: boolean;
  setShowLink: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<IContext>({
  cursorRef: null,
  showLink: false,
  setShowLink: () => {},
});

export const Background: FC<{ children: ReactNode }> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showLink, setShowLink] = useState(false);

  return (
    <ResonateProvider>
      <Context.Provider value={{ cursorRef, showLink, setShowLink }}>
        <Cursor ref={cursorRef} />
        {children}
      </Context.Provider>
    </ResonateProvider>
  );
};
