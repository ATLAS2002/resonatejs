"use client";

import { ResonateContainer, tilt, glare, useResonate } from "@resonatejs/react";

export const Card = ({
  link,
  title,
  description,
}: {
  link: string;
  title: string;
  description: string;
}) => {
  const trackers = useResonate({
    presets: [glare(), tilt()],
  });

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <ResonateContainer
        trackers={trackers}
        className="group rounded-lg px-5 py-4 transition-colors hover:bg-gray-100 hover:dark:bg-neutral-800/30"
      >
        <h2 className="mb-3 text-2xl font-semibold group-hover:scale-110 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all">
          {`${title} `}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50 group-hover:-translate-y-1 transition-all">
          {description}
        </p>
      </ResonateContainer>
    </a>
  );
};
