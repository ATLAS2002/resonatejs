import { RefObject } from "react";

export const extractElementFromRef = <T extends HTMLElement>(
  ref: RefObject<T>
): T | never => {
  const elm = ref.current;
  if (!elm) throw new Error("Inject the ref object to the proper component");

  return elm;
};

export * from "./executor";
