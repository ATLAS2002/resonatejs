"use client";
import { useResonate, ResonateWrapper, glowEffect } from "@resonatejs/react";

export default function Page(): JSX.Element {
  const trackers = useResonate({
    presets: [
      glowEffect({
        stay: false,
      }),
    ],
  });

  return (
    <main className="h-screen w-full bg-slate-200">
      <ResonateWrapper
        trackers={trackers}
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: "orange",
          position: "relative",
        }}
      >
        <div
          className="bg-lime-600 cursor-pointer text-lime-200 h-fit w-5/6 text-6xl rounded-3xl text-center p-2 my-2 mx-auto"
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
