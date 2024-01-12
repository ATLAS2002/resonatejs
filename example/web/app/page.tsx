"use client";

import { ReactNode } from "react";
import Card from "../components/Card";

export default function Page(): ReactNode {
  return (
    <main className="h-screen w-full bg-slate-200 p-4">
      <Card>
        <h1 className="w-fit font-sans text-slate-500 text-3xl font-bold mx-7 mt-5">
          Resonate
          <span className="text-base font-mono text-slate-300 ml-2 bg-slate-400 p-1 rounded-full">
            #glow_effect
          </span>
        </h1>
      </Card>
      <Card>
        <div></div>
      </Card>
    </main>
  );
}
