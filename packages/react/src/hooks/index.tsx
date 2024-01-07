"use client";

import { RefObject, useEffect, useRef } from "react";

export const useResonate = <
  T extends HTMLElement = HTMLDivElement,
>(): RefObject<T> => {
  const wrapperRef = useRef<T>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) console.log("Captured element");

    const handleClick = () => {
      console.log("click event triggered");
    };

    wrapper?.addEventListener("click", handleClick);

    return () => {
      wrapper?.removeEventListener("click", handleClick);
    };
  }, [wrapperRef]);

  return wrapperRef;
};
