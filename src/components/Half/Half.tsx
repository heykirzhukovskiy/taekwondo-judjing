type HalfProps = {
	color: "red" | "blue";
	name: string;
	score: number;
} & React.ComponentProps<"div">;

const classNames = {
	red: "bg-red-600",
	blue: "bg-blue-600",
};

export const Half = ({ color, name, score }: HalfProps) => (
	<div
		className={`w-1/2 h-screen grid justify-center pt-10 ${classNames[color]}`}
	>
		<div className="align-top h-fit text-center text-5xl">{name}</div>
		<div className="align-middle text-[40rem] text-center">{score}</div>
	</div>
);
