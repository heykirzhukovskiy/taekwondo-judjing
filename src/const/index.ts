import type { KeyVariant } from "../components/Instructions/Instructions";

export const author = {
	name: "Kirill Petunin",
	url: "https://holakirr.com",
	email: "kpetunin@proton.me",
};

export const DEVELOPED_YEAR = 2024;

export type StageVariant =
	| "SETTING_UP"
	| "FIRST_ROUND"
	| "BREAK"
	| "SECOND_ROUND"
	| "PAUSE"
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

export type KeyObject = {
	code: KeyVariant;
	forText: string;
};

export const KEYS: { [key in StageVariant]: KeyObject[] } = {
	SETTING_UP: [{ code: "Enter", forText: "для начала" }],
	FIRST_ROUND: [
		{ code: "Space", forText: "для паузы" },
		{ code: "ArrowLeft", forText: "добавить очко левому бойцу" },
		{ code: "ArrowRight", forText: "добавить очко правому бойцу" },
	],
	BREAK: [{ code: "Space", forText: "для паузы" }],
	SECOND_ROUND: [
		{ code: "Space", forText: "для паузы" },
		{ code: "ArrowLeft", forText: "добавить очко левому бойцу" },
		{ code: "ArrowRight", forText: "добавить очко правому бойцу" },
	],
	PAUSE: [{ code: "Space", forText: "для продолжения" }],
	END: [{ code: "Enter", forText: "для начала" }],
};

export const STAGE_NAMES: { [key in StageVariant]: string } = {
	SETTING_UP: "Настройка",
	FIRST_ROUND: "Раунд 1",
	BREAK: "Перерыв",
	PAUSE: "Пауза",
	SECOND_ROUND: "Раунд 2",
	END: "Конец боя",
};

export const TIMES = {
	ROUND: 60,
	BREAK: 30,
};

export const PLAYER_NAMES = {
	FIRST: "Левый боец",
	SECOND: "Правый боец",
};

export type FightStateType = {
	stage: StageVariant;
	prevStage: StageVariant;
	roundTime: number;
	breakTime: number;
	firstPlayerName: string;
	firstPlayer: number;
	secondPlayerName: string;
	secondPlayer: number;
	timer: number;
	keys: KeyObject[];
	fightNumber: number;
};

export const defaultFightState: FightStateType = {
	stage: STAGES.SETTING_UP,
	prevStage: STAGES.SETTING_UP,
	roundTime: TIMES.ROUND,
	breakTime: TIMES.BREAK,
	firstPlayerName: "",
	firstPlayer: 0,
	secondPlayerName: "",
	secondPlayer: 0,
	timer: 0,
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
	firstPlayerName: PLAYER_NAMES.FIRST,
	secondPlayerName: PLAYER_NAMES.SECOND,
	roundTime: TIMES.ROUND,
	breakTime: TIMES.BREAK,
	fightNumber: 1,
};
