"use client";

import Image from "next/image";
import { forwardRef, useContext, useRef } from "react";
import { ResonateContainer, useResonate } from "@resonatejs/react";
import { Context } from "./bg";

const Layer = forwardRef<HTMLAnchorElement, { hidden: boolean }>(
  ({ hidden }, ref) => (
    <a
      className={`gap-2 p-8 font-bold text-lg lg:pointer-events-auto lg:p-0 pointer-events-none absolute h-6 w-32 place-items-center flex text-black ${hidden ? "z-50" : "dark:invert"}`}
      ref={ref}
      style={{ clipPath: `${hidden ? "circle(0)" : ""}` }}
      href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      By{" "}
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
      />
    </a>
  ),
);

export const Credit = () => {
  const hiddenLayer = useRef<HTMLAnchorElement>(null);
  const cursorRef = useContext(Context).cursorRef;
  const trackers = useResonate({
    listeners: () => {
      const cursor = cursorRef?.current!;
      const mask = hiddenLayer.current!;
      const container = mask.getBoundingClientRect();

      return {
        mouseenter: () => {
          cursor.style.scale = "3";
        },
        mousemove: () => {
          const { width, top, left } = cursor.getBoundingClientRect();
          const center = {
            x: left + width / 2 - container.x,
            y: top + width / 2 - container.y,
          };

          mask.style.clipPath = `circle(${width / 2}px at ${center.x}px ${center.y}px)`;
        },
        mouseleave: () => {
          cursor.style.scale = "1";
          mask.style.clipPath = "circle(0)";
        },
      };
    },
  });

  return (
    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
      <ResonateContainer trackers={trackers} className="p-4 group">
        <Layer hidden={false} />
        <Layer ref={hiddenLayer} hidden={true} />
      </ResonateContainer>
    </div>
  );
};
