"use client";
import {
  FightStateType,
  FormParam,
  FormStateType,
  STAGES,
  StageVariant,
  defaultFightState,
  defaultFormState,
} from "@/const";

import { useState } from "react";

export const useFightState = () => {
  const [fightState, setFightState] =
    useState<FightStateType>(defaultFightState);

  const updateFightStage = (newStage: StageVariant) => {
    let stageTimeOut: string | number | NodeJS.Timeout | undefined;
    setFightState((prev) => {
      clearInterval(prev.interval);

      console.log(prev);
      return prev;
    });

    switch (newStage) {
      case STAGES.FIRST_ROUND || STAGES.SECOND_ROUND:
        setFightState((prev) => {
          clearTimeout(stageTimeOut);
          stageTimeOut = setTimeout(() => {
            updateFightStage(STAGES.BREAK);
          }, prev.timer * 1000);
          return {
            ...prev,
            prevStage: prev.stage,
            stage: newStage,
            keys: [
              { code: "Space", forText: "для паузы" },
              { code: "ArrowLeft", forText: "добавить очко левому бойцу" },
              { code: "ArrowRight", forText: "добавить очко правому бойцу" },
              { code: "Enter", forText: "для окончания раунда" },
            ],
            timer: prev.stage === STAGES.PAUSE ? prev.timer : prev.times.ROUND,
            interval: setInterval(() => {
              setFightState((prev) => ({
                ...prev,
                timer: prev.timer > 0 ? prev.timer - 1 : 0,
              }));
            }, 1000),
          };
        });
        break;
      case STAGES.PAUSE:
        clearTimeout(stageTimeOut);
        setFightState((prev) => ({
          ...prev,
          stage: newStage,
          keys: [{ code: "Space", forText: "для продолжения" }],
        }));
        break;
      case STAGES.BREAK:
        clearTimeout(stageTimeOut);
        setFightState((prev) => {
          setInterval(() => {
            setFightState((prev) => ({
              ...prev,
              timer: prev.timer > 0 ? prev.timer - 1 : 0,
            }));
          }, 1000);
          setTimeout(() => {
            updateFightStage(STAGES.SECOND_ROUND);
          }, prev.times.BREAK * 1000);
          return {
            ...prev,
            stage: newStage,
            timer: prev.stage === STAGES.PAUSE ? prev.timer : prev.times.BREAK,
            interval: setInterval(() => {
              setFightState((prev) => ({
                ...prev,
                timer: prev.timer > 0 ? prev.timer - 1 : 0,
              }));
            }),
          };
        });
        break;
      case STAGES.END:
        return setFightState((prev) => {
          clearInterval(prev.interval);
          return {
            ...prev,
            stage: newStage,
            timer: 0,
            keys: [{ code: "Enter", forText: "для начала" }],
          };
        });
      case STAGES.SETTING_UP:
        return setFightState(defaultFightState);
      default:
      // Remove the unused variable
      // let _exhaustiveCheck: never;
    }
  };

  return { fightState, setFightState, updateFightStage };
};

export const useFormState = () => {
  const [formState, setFormState] = useState<FormStateType>(defaultFormState);

  const updateFormState = (
    param: FormParam,
    value: FormStateType[FormParam]
  ) => {
    setFormState((prev) => ({ ...prev, [param]: value }));
  };

  return { formState, setFormState, updateFormState };
};
