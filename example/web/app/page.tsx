"use client";

import { ReactNode } from "react";
import Card from "../components/Card";

export default function Page(): ReactNode {
  return (
    <main className="h-screen w-full bg-slate-200 p-4">
      <Card>
        <h1 className="w-fit font-sans text-orange-600 text-3xl font-bold mx-7 mt-5">
          Resonate
          <button className="text-base font-mono text-orange-200 ml-2 px-2 bg-orange-600 p-1 rounded-full">
            #glow_effect
          </button>
        </h1>
      </Card>
      {/* <Card>
        <div></div>
      </Card> */}
    </main>
  );
}
