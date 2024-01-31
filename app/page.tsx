"use client";

import { Half, Instructions, Modal } from "@/components";
import { STAGES, STAGE_NAMES, TIMES } from "@/const";
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

  const handleStartButton = () => {
    setModalOpen(false);
    const {
      firstPlayerName,
      secondPlayerName,
      roundTime,
      fightNumber,
      breakTime,
    } = formState;
    setFightState((prev) => ({
      ...prev,
      left: {
        name: firstPlayerName ? firstPlayerName : prev.left.name,
        score: 0,
      },
      right: {
        name: secondPlayerName ? secondPlayerName : prev.right.name,
        score: 0,
      },
      times: {
        ROUND: roundTime ? Number(roundTime) : prev.times.ROUND,
        BREAK: breakTime ? Number(breakTime) : prev.times.BREAK,
      },
      fightNumber: fightNumber ? fightNumber : 1,
      timer: roundTime ? Number(roundTime) : TIMES.ROUND,
    }));
    updateFightStage(STAGES.FIRST_ROUND);
  };

  const keyboardHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape" && modalOpen) {
      e.preventDefault();
      handleToggleModal();
    }
    if (
      e.code === "Enter" &&
      [STAGES.SETTING_UP, STAGES.END].includes(fightState.stage)
    ) {
      e.preventDefault();
      setModalOpen(true);
    }
    if (
      [STAGES.FIRST_ROUND, STAGES.SECOND_ROUND, STAGES.BREAK].includes(
        fightState.stage
      )
    ) {
      switch (e.code) {
        case "ArrowRight":
          e.preventDefault();
          setNewScore("right");
          break;
        case "ArrowLeft":
          e.preventDefault();
          setNewScore("left");
          break;
        case "Space":
          e.preventDefault();
          if (fightState.stage === STAGES.PAUSE) {
            updateFightStage(fightState.prevStage);
          }
          if (
            [STAGES.FIRST_ROUND, STAGES.SECOND_ROUND, STAGES.BREAK].includes(
              fightState.stage
            )
          ) {
            updateFightStage(STAGES.PAUSE);
          }
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyboardHandler);
    return () => document.removeEventListener("keydown", keyboardHandler);
  }, [fightState.stage]);

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
      <p className="absolute top-[15%] text-6xl">
        {STAGE_NAMES[fightState.stage]}
      </p>
      {fightState.timer && (
        <p className="absolute top-[50%] -translate-y-1/2 text-6xl">
          {fightState.timer}
        </p>
      )}
      <div className="absolute bottom-[5%] flex flex-col items-center gap-2">
        {fightState.keys.map((key) => (
          <Instructions key={key.code} {...key} />
        ))}
      </div>
      <Modal
        onStart={handleStartButton}
        isOpen={modalOpen}
        onClose={handleToggleModal}
        formState={formState}
        onFormUpdate={updateFormState}
      />
    </main>
  );
}
