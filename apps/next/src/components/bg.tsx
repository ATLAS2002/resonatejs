"use client";

import { ResonateProvider } from "@resonatejs/react";
import {
  useRef,
  createContext,
  useState,
  type FC,
  type ReactNode,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Trailer } from "./trailer";

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
        <Trailer ref={cursorRef} />
        {children}
      </Context.Provider>
    </ResonateProvider>
  );
};
