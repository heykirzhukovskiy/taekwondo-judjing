import {
  FightStateType,
  FormParam,
  FormStateType,
  STAGES,
  StageVariant,
  defaultFightState,
  defaultFormState,
} from "@/const";
import { SOUNDS } from "@/public/sound";
import { useState } from "react";

export const useFightState = () => {
  const [fightState, setFightState] =
    useState<FightStateType>(defaultFightState);

  const updateFightStage = (newStage: StageVariant) => {
    let timeout;
    switch (newStage) {
      case STAGES.SETTING_UP:
        return setFightState(defaultFightState);
      case STAGES.FIRST_ROUND || STAGES.SECOND_ROUND:
        setFightState((prev) => ({
          ...prev,
          prevStage: prev.stage,
          stage: newStage,
          timer: fightState.times.ROUND,
          sound: SOUNDS[newStage],
          keys: [
            { code: "Space", forText: "для паузы" },
            { code: "ArrowLeft", forText: "добавить очко левому бойцу" },
            { code: "ArrowRight", forText: "добавить очко правому бойцу" },
            { code: "Enter", forText: "для окончания раунда" },
          ],
        }));
        timeout = setTimeout(() => {
          updateFightStage(STAGES.BREAK);
        }, fightState.times.ROUND * 1000);
        break;
      case STAGES.PAUSE:
        setFightState((prev) => ({
          ...prev,
          stage: newStage,
          sound: SOUNDS[newStage],
          keys: [{ code: "Space", forText: "для продолжения" }],
        }));
        break;
      case STAGES.BREAK:
        setFightState((prev) => ({
          ...prev,
          stage: newStage,
          timer: fightState.times.BREAK,
          sound: SOUNDS[newStage],
        }));
        setTimeout(() => {
          updateFightStage(STAGES.END);
        }, fightState.times.BREAK * 1000);
        break;
      case STAGES.END:
        return setFightState((prev) => ({
          ...prev,
          stage: newStage,
          timer: 0,
          sound: SOUNDS[newStage],
          winner:
            prev.left.score > prev.right.score
              ? prev.left.name
              : prev.right.name,
          keys: [{ code: "Enter", forText: "для начала" }],
        }));
      default:
        let _exhaustiveCheck: never;
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
