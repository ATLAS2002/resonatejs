import { ResonateContainer, useResonate, glare } from "@resonatejs/react";
import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  const trackers = useResonate({
    presets: [glare({ highlight: "#ffffff33" })],
    // customEventListeners: () => ({
    //   mousemove: (e) => console.log(e.x, e.y),
    // }),
  });

  return (
    <div className="w-1/2 max-w-xl min-w-80 m-4 aspect-video rounded-3xl hover:scale-1050 transition duration-500">
      <ResonateContainer
        trackers={trackers}
        className="rounded-3xl transform-gpu overflow-hidden border-slate-100 bg-slate-900"
      >
        {children}
      </ResonateContainer>
    </div>
  );
};

export default Card;
