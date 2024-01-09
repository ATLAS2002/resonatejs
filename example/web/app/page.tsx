"use client";
import { useResonate, ResonateWrapper, glowEffect } from "@resonatejs/react";

export default function Page(): JSX.Element {
  const tracker = useResonate({
    presets: [glowEffect()],
  });

  return (
    <main className="h-screen w-full bg-slate-200">
      <ResonateWrapper
        tracker={tracker}
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: "orange",
          position: "relative",
        }}
      >
        <div
          className="bg-lime-600 text-lime-200 h-fit w-full text-6xl"
          onClick={() => {
            console.log("clicked");
          }}
        >
          HELLO
        </div>
      </ResonateWrapper>
    </main>
  );
}
