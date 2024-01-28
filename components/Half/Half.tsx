type HalfProps = {
  color: "red" | "blue";
};

const classNames = {
  red: "bg-red-800",
  blue: "bg-blue-800",
};

export const Half = ({ color }: HalfProps) => {
  const className = classNames[color];
  return <div className={"w-1/2 h-full " + className}></div>;
};
