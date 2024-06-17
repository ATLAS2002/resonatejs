"use client";

import Image from "next/image";
import {
  ResonateContainer,
  shimmer,
  useGlobal,
  useResonate,
} from "@resonatejs/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "./bg";
import { bound } from "../utils";

const MAX_DURATION = 20;

export const Logo = () => {
  const cursorRef = useContext(Context).cursorRef;
  const { speed } = useGlobal();
  const [maxSpeed, setMaxSpeed] = useState(0);
  useEffect(() => {
    setMaxSpeed(bound(Math.max(speed * 2.5, maxSpeed), 0, MAX_DURATION - 0.1));

    const decelerate = () => {
      setMaxSpeed(
        bound(
          maxSpeed - (MAX_DURATION - maxSpeed) * 0.01,
          0,
          MAX_DURATION - 0.1,
        ),
      );
      requestAnimationFrame(decelerate);
    };
    requestAnimationFrame(decelerate);
  }, [speed, maxSpeed]);

  const trackers = useResonate({
    presets: [shimmer()],
    listeners: () => {
      const cursor = cursorRef?.current!;

      return {
        mouseenter: () => {
          cursor.style.scale = "0.4";
          cursor.style.border = "4px dotted white";
          cursor.style.backgroundColor = "rgba(0,0,0,0.3)";
          cursor.style.animation = `spin ${MAX_DURATION - maxSpeed}s linear infinite`;
        },
        mouseleave: () => {
          cursor.style.scale = "1";
          cursor.style.border = "none";
          cursor.style.backgroundColor = "white";
          cursor.style.animation = "none";
        },
      };
    },
  });

  return (
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
      <ResonateContainer trackers={trackers} className="py-40 px-80">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </ResonateContainer>
    </div>
  );
};
