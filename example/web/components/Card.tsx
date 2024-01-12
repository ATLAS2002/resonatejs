import { ResonateContainer, glowEffect, useResonate } from "@resonatejs/react";

const Card: any = ({ children }: { children: any }) => {
  const trackers = useResonate({
    presets: [
      glowEffect({
        stay: true,
        dispersion: "80%",
      }),
      // hoverEffect({}),
    ],
    customEventListeners: ({ getDistanceFromCenter }) => ({
      mouseenter: ({ x, y }) => {
        console.log(getDistanceFromCenter({ x, y }));
      },
    }),
  });

  return (
    <div className="w-1/2 max-w-xl min-w-80 m-4 aspect-video rounded-3xl hover:scale-105 bg-slate-300 overflow-hidden transition duration-500">
      <ResonateContainer
        trackers={trackers}
        className="rounded-3xl border-t-2 border-slate-100"
      >
        {children}
      </ResonateContainer>
    </div>
  );
};

export default Card;
