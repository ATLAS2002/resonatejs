import { RefObject } from "react";
import { RefTitle } from "../types";

export const extractElementFromRef = <T extends HTMLElement>(
  ref: RefObject<T>,
  title: RefTitle
): T | never => {
  const elm = ref.current;
  if (!elm) {
    const errorMessage = `Inject the ref object${
      title ? ": " + title + "," : ""
    } to the proper component`;

    throw new Error(errorMessage);
  }

  return elm;
};

export * from "./operation-manager";
