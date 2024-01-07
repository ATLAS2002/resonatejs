"use client";
import { useResonate, ResonateWrapper } from "@resonatejs/react";

export default function Page(): JSX.Element {
  const resonateRef = useResonate();

  return (
    <main>
      <ResonateWrapper
        resonateRef={resonateRef}
        style={{
          width: "fit-content",
          height: "fit-content",
        }}
      >
        <div style={{}}></div>
      </ResonateWrapper>
    </main>
  );
}
