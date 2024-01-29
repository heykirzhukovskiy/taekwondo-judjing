import { HTMLAttributes } from "react";

type HalfProps = {
  color: "red" | "blue";
} & HTMLAttributes<HTMLDivElement>;

const classNames = {
  red: "bg-red-600",
  blue: "bg-blue-600",
};

export const Half = ({ color, children }: HalfProps) => (
  <div className={"w-1/2 h-screen " + classNames[color]}>{children}</div>
);
