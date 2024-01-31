"use client";

import { Half, Instructions, Modal } from "@/components";
import {
  FightStateType,
  FormParam,
  FormStateType,
  PLAYER_NAMES,
  STAGES,
  STAGE_NAMES,
  defaultFightState,
  defaultFormState,
} from "@/const";
import { useEffect, useState } from "react";

export default function Home() {
  const [fightState, setFightState] =
    useState<FightStateType>(defaultFightState);
  const [formState, setFormState] = useState<FormStateType>(defaultFormState);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormUpdate = (
    param: FormParam,
    value: FormStateType[FormParam]
  ) => {
    setFormState((prev) => ({ ...prev, [param]: value }));
  };
  const startFightState = (newValues: FormStateType) => {
    setFightState((prev) => ({
      ...prev,
      ...newValues,
    }));
  };
  const addPoint = (player: "firstPlayer" | "secondPlayer") => {
    setFightState((prev) => ({ ...prev, [player]: prev[player] + 1 }));
  };

  const handleStartButton = () => {
    console.log(formState);

    startFightState(formState);
    setFightState((prev) => {
      return {
        ...prev,
        stage: STAGES.FIRST_ROUND,
      };
    });
    setFightState((prev) => {
      console.log(prev);
      return prev;
    });
    setModalOpen(false);
  };

  const keyboardHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape" && modalOpen) {
      e.preventDefault();
      setModalOpen(false);
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
          addPoint("firstPlayer");
          break;
        case "ArrowLeft":
          e.preventDefault();
          addPoint("secondPlayer");
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
        name={fightState.firstPlayerName || PLAYER_NAMES.FIRST}
        score={fightState.firstPlayer}
      />
      <Half
        color="blue"
        name={fightState.secondPlayerName || PLAYER_NAMES.SECOND}
        score={fightState.secondPlayer}
      />
      <p className="absolute top-[5%] text-8xl">
        Бой: {fightState.fightNumber}
      </p>
      <p className="absolute top-[15%] text-6xl">
        {STAGE_NAMES[fightState.stage]}
      </p>
      {fightState.timer ? (
        <p className="absolute top-[50%] -translate-y-1/2 text-6xl">
          {fightState.timer}
        </p>
      ) : (
        <></>
      )}
      <div className="absolute bottom-[5%] flex flex-col items-center gap-2">
        {fightState.keys.map((key) => (
          <Instructions key={key.code} {...key} />
        ))}
      </div>
      <Modal
        onStart={handleStartButton}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        formState={formState}
        handleFormUpdate={handleFormUpdate}
      />
    </main>
  );
}
