"use client";

import { forwardRef, useContext } from "react";
import { useGlobal } from "@resonatejs/react";
import { Context } from "./bg";

export const Trailer = forwardRef<HTMLDivElement>((_, ref) => {
  const { globalX: x, globalY: y, speed, present } = useGlobal();
  const { showLink } = useContext(Context);

  return (
    <div
      ref={ref}
      className={`absolute top-0 left-0 z-10 w-12 h-12 bg-white rounded-full pointer-events-none transition-all duration-100 ease-out`}
      style={{
        translate: `${x - 24}px ${y - 24}px 0`,
        opacity: present ? 1 : 0,
        boxShadow: `0 0 ${speed < 2000 ? "0 0" : "5px 2px"} white`,
      }}
    >
      <h1
        className={`h-full w-full ${showLink ? "scale-125 rotate-45" : "scale-0 -rotate-45"} flex justify-center items-center text-lg font-semibold text-black transition-all duration-300 ease-out`}
      >
        &lt;-
      </h1>
    </div>
  );
});
