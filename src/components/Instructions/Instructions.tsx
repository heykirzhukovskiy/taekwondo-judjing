import { HTMLAttributes } from "react";
import { KBD } from "..";

export type KeyVariant = "Enter" | "ArrowLeft" | "ArrowRight" | "Space";

type InstructionsProps = HTMLAttributes<HTMLDivElement> & {
  code: KeyVariant;
  forText: string;
};

export const Instructions = ({ code, forText }: InstructionsProps) => (
  <div className="text-4xl flex items-center gap-4">
    <p>Нажмите</p>
    <KBD>{code}</KBD>
    <p>{forText}</p>
  </div>
);
