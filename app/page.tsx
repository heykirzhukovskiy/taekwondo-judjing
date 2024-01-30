"use client";

import { Half, Instructions, Modal } from "@/components";
import { STAGES } from "@/const";
import { useFightState, useFormState } from "@/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const { fightState, setFightState, updateFightStage } = useFightState();
  const { formState, updateFormState } = useFormState();
  const [modalOpen, setModalOpen] = useState(false);

  const setNewScore = (side: "left" | "right") => {
    setFightState((prev) => ({
      ...prev,
      [side]: {
        ...prev[side],
        score: prev[side].score + 1,
      },
    }));
  };

  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleStart = () => {
    setModalOpen(false);
    updateFightStage(STAGES.FIRST_ROUND);
    setFightState((prev) => ({
      ...prev,
      left: {
        name: formState.firstPlayerName
          ? formState.firstPlayerName
          : prev.left.name,
        score: 0,
      },
      right: {
        name: formState.secondPlayerName
          ? formState.secondPlayerName
          : prev.right.name,
        score: 0,
      },
      times: {
        ROUND: formState.roundTime ? formState.roundTime : prev.times.ROUND,
        BREAK: formState.breakTime ? formState.breakTime : prev.times.BREAK,
      },
      fightNumber: formState.fightNumber ? formState.fightNumber : 1,
    }));
  };

  const keyboardHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      e.preventDefault();
      handleToggleModal();
    }
    if (e.code === "Enter") {
      e.preventDefault();
      setModalOpen(true);
      updateFightStage(STAGES.FIRST_ROUND);
      new Audio(fightState.sound).play();
    }
    if (
      fightState.stage === STAGES.FIRST_ROUND ||
      fightState.stage === STAGES.SECOND_ROUND
    ) {
      if (e.code === "ArrowRight") {
        setNewScore("right");
      }
      if (e.code === "ArrowLeft") {
        setNewScore("left");
      }
      if (e.code === "Space") {
        updateFightStage(STAGES.PAUSE);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyboardHandler);
    return () => document.removeEventListener("keydown", keyboardHandler);
  }, []);

  return (
    <main className="flex justify-center relative">
      <Half
        color="red"
        name={fightState.left.name}
        score={fightState.left.score}
      />
      <Half
        color="blue"
        name={fightState.right.name}
        score={fightState.right.score}
      />
      <p className="absolute top-[5%] text-8xl">
        Бой: {fightState.fightNumber}
      </p>
      <p className="absolute top-[15%] text-6xl">{STAGES[fightState.stage]}</p>
      {(fightState.stage === STAGES.PAUSE ||
        fightState.stage === STAGES.FIRST_ROUND ||
        fightState.stage === STAGES.SECOND_ROUND) && (
        <p className="absolute top-[50%] -translate-y-1/2 text-6xl">
          {fightState.timer}
        </p>
      )}
      <Modal
        onStart={handleStart}
        isOpen={modalOpen}
        onClose={handleToggleModal}
        formState={formState}
        onFormUpdate={updateFormState}
      />
      <div className="absolute bottom-[5%] flex flex-col items-center gap-2">
        {fightState.keys.map((key) => (
          <Instructions key={key.code} {...key} />
        ))}
      </div>
    </main>
  );
}
