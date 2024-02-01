import { useEffect, useState } from "react";
import { Footer, Half, Instructions, Modal } from "./components";
import { PLAYER_NAMES, STAGES, STAGE_NAMES } from "./const";
import { useFightState, useFormState } from "./hooks";

export default function Home() {
  const { fightState, startFightState, addPoint, setFightStage } =
    useFightState();
  const { formState, handleFormUpdate } = useFormState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleStartButton = () => {
    startFightState(formState);
    setFightStage(STAGES.FIRST_ROUND);
    setModalOpen(false);
  };

  useEffect(() => {
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
            setFightStage(STAGES.PAUSE);
            break;
        }
      }
      if (fightState.stage === STAGES.PAUSE && e.code === "Space") {
        e.preventDefault();
        setFightStage(fightState.prevStage);
      }
    };
    document.addEventListener("keypress", keyboardHandler);
    return () => document.removeEventListener("keypress", keyboardHandler);
  }, [fightState.stage]);

  return (
    <>
      <main className="flex justify-center relative font-semibold">
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
        {[
          STAGES.BREAK,
          STAGES.PAUSE,
          STAGES.FIRST_ROUND,
          STAGES.SECOND_ROUND,
        ].includes(fightState.stage) ? (
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
      <Footer />
    </>
  );
}
