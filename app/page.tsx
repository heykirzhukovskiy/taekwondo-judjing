"use client";

import { Half } from "@/components";
import { useState } from "react";

export default function Home() {
  const [fightState, setFightState] = useState("idle");

  return (
    <main className="flex relative">
      <Half color="red" />
      <Half color="blue" />
    </main>
  );
}
