import { KBD } from "..";

export type KeyVariant = "Enter" | "ArrowLeft" | "ArrowRight" | "Space";

type InstructionsProps = React.ComponentProps<"div"> & {
	code: KeyVariant;
	forText: string;
};

export const Instructions = ({ code, forText }: InstructionsProps) => (
	<div className="text-base flex items-center gap-2">
		<p>Нажмите</p>
		<KBD>{code}</KBD>
		<p>{forText}</p>
	</div>
);
