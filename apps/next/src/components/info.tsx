"use client";

import { useAPI, useGlobal } from "@resonatejs/react";
import { useEffect, useRef } from "react";
import { bound } from "../utils";

export const InfoBar = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { globalX, globalY } = useGlobal();

  const mousePosition = {
    x: globalX,
    y: globalY,
  };

  useEffect(() => {
    const elm = ref.current!;
    const { getRelativePositionFromCenter, getDistanceFromCenter } =
      useAPI<HTMLParagraphElement>(ref);

    const { x, y } = getRelativePositionFromCenter(mousePosition);
    const distance = Math.round(1000 / getDistanceFromCenter(mousePosition));

    const dx = bound(x / 50, -1, 1);
    const dy = bound(y / 50, -1, 1);

    elm.style.boxShadow = `${dx}px ${dy}px 0 1px rgba(255,255,255,${bound(distance, 0, 6) / 10})`;
    elm.style.color = `rgba(255,255,255,${bound(distance, 5, 10) / 10})`;
  }, [globalX, globalY]);

  return (
    <p
      ref={ref}
      className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
    >
      Get started by editing&nbsp;
      <code className="font-mono font-bold">src/app/page.tsx</code>
    </p>
  );
};
