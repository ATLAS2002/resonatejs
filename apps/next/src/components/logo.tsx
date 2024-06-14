"use client";

import Image from "next/image";
import { ResonateContainer, shimmer, useResonate } from "@resonatejs/react";

export const Logo = () => {
  const trackers = useResonate({
    presets: [shimmer({ fade: 5 })],
  });

  return (
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
  );
};
