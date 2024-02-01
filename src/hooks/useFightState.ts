import { useState } from "react";
import {
  FightStateType,
  FormStateType,
  KEYS,
  STAGES,
  StageVariant,
  defaultFightState,
} from "../const";
let interval: NodeJS.Timeout;
let timeout: NodeJS.Timeout;

export const useFightState = () => {
  const [fightState, setFightState] =
    useState<FightStateType>(defaultFightState);

  const startFightState = (newValues: FormStateType) => {
    setFightState((prev) => ({
      ...prev,
      ...newValues,
    }));
  };

  const addPoint = (player: "firstPlayer" | "secondPlayer") => {
    setFightState((prev) => ({ ...prev, [player]: prev[player] + 1 }));
  };

  const setFightStage = (stage: StageVariant) => {
    setFightState((prev) => {
      let timerTime = 0;
      let newState = { ...prev, keys: KEYS[stage] };
      clearInterval(interval);
      clearTimeout(timeout);
      switch (stage) {
        case STAGES.FIRST_ROUND:
          timerTime = prev.stage === STAGES.PAUSE ? prev.timer : prev.roundTime;
          timeout = setTimeout(() => {
            setFightStage(STAGES.BREAK);
          }, timerTime * 1000);
          interval = setInterval(() => {
            setFightState((prev) => ({ ...prev, timer: prev.timer - 1 }));
          }, 1000);
          newState = {
            ...prev,
            stage,
            timer: timerTime,
          };
          break;
        case STAGES.SECOND_ROUND:
          timerTime =
            prev.stage === STAGES.PAUSE ? prev.timer : prev.roundTime++;
          timeout = setTimeout(() => {
            setFightStage(STAGES.END);
          }, timerTime * 1000);
          interval = setInterval(() => {
            setFightState((prev) => ({ ...prev, timer: prev.timer - 1 }));
          }, 1000);
          newState = {
            ...prev,
            stage,
            timer: timerTime,
          };
          break;
        case STAGES.BREAK:
          timerTime =
            prev.stage === STAGES.PAUSE ? prev.timer : prev.breakTime++;
          timeout = setTimeout(() => {
            setFightStage(STAGES.SECOND_ROUND);
          }, timerTime * 1000);
          interval = setInterval(() => {
            setFightState((prev) => ({ ...prev, timer: prev.timer - 1 }));
          }, 1000);
          newState = {
            ...prev,
            stage,
            timer: timerTime,
          };
          break;
        case STAGES.PAUSE:
          newState = {
            ...prev,
            prevStage: prev.stage,
            stage,
          };
          break;
        case STAGES.END:
          newState = {
            ...prev,
            stage,
            timer: 0,
          };
          break;
      }
      return newState;
    });
  };
  return {
    fightState,
    startFightState,
    addPoint,
    setFightStage,
  };
};
