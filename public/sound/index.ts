import { StageVariant } from "@/const";
import END from "./fatality.mp3";
import SECOND_ROUND from "./finalround.mp3";
import BREAK from "./gong.mp3";
import PAUSE from "./laugh.mp3";
import SETTING_UP from "./prepare_to_die.mp3";
import FIRST_ROUND from "./round1.mp3";

export const SOUNDS: { [key in StageVariant]: string } = {
  END,
  SECOND_ROUND,
  BREAK,
  PAUSE,
  FIRST_ROUND,
  SETTING_UP,
};
