import { KeyVariant } from "@/components/Instructions/Instructions";

export const author = {
  name: "Kirill Petunin",
  url: "https://holakirr.com",
  email: "kpetunin@proton.me",
};

export type StageVariant =
  | "SETTING_UP"
  | "FIRST_ROUND"
  | "BREAK"
  | "PAUSE"
  | "SECOND_ROUND"
  | "END";

type StageObject = {
  [key in StageVariant]: StageVariant;
};

export const STAGES: StageObject = {
  SETTING_UP: "SETTING_UP",
  FIRST_ROUND: "FIRST_ROUND",
  BREAK: "BREAK",
  PAUSE: "PAUSE",
  SECOND_ROUND: "SECOND_ROUND",
  END: "END",
};

export const STAGE_NAMES = {
  SETTING_UP: "Настройка",
  FIRST_ROUND: "Round 1",
  BREAK: "Перерыв",
  PAUSE: "Пауза",
  SECOND_ROUND: "Round 2",
  END: "Конец боя",
};

export const TIMES = {
  ROUND: 60,
  BREAK: 30,
};

export type FightStateType = {
  stage: StageVariant;
  prevStage: StageVariant;
  times: typeof TIMES;
  right: {
    name: string;
    score: number;
  };
  left: {
    name: string;
    score: number;
  };
  timer: number;
  keys: {
    code: KeyVariant;
    forText: string;
  }[];
  fightNumber: number;
  interval: string | number | NodeJS.Timeout | undefined;
};

export const defaultFightState: FightStateType = {
  stage: STAGES.SETTING_UP,
  prevStage: STAGES.SETTING_UP,
  times: TIMES,
  right: {
    name: "right fighter",
    score: 0,
  },
  left: {
    name: "left fighter",
    score: 0,
  },
  timer: 0,
  interval: undefined,
  keys: [{ code: "Enter", forText: "для начала" }],
  fightNumber: 1,
};

export type FormParam =
  | "firstPlayerName"
  | "secondPlayerName"
  | "roundTime"
  | "breakTime"
  | "fightNumber";

export type FormStateType = {
  firstPlayerName: string;
  secondPlayerName: string;
  roundTime: number;
  breakTime: number;
  fightNumber: number;
};

export type FormInput = {
  name: FormParam;
  label: string;
  type: string;
};

export const formInputs: FormInput[] = [
  {
    name: "firstPlayerName",
    label: "Имя первого бойца",
    type: "text",
  },
  {
    name: "secondPlayerName",
    label: "Имя второго бойца",
    type: "text",
  },
  {
    name: "roundTime",
    label: "Время раунда (сек)",
    type: "number",
  },
  {
    name: "breakTime",
    label: "Время перерыва (сек)",
    type: "number",
  },
  {
    name: "fightNumber",
    label: "Номер боя",
    type: "number",
  },
];

export const defaultFormState: FormStateType = {
  firstPlayerName: "",
  secondPlayerName: "",
  roundTime: TIMES.ROUND,
  breakTime: TIMES.BREAK,
  fightNumber: 1,
};
