type HalfProps = {
  color: "red" | "blue";
};

const classNames = {
  red: "bg-red-600",
  blue: "bg-blue-600",
};

export const Half = ({ color }: HalfProps) => {
  const className = classNames[color];
  return <div className={"w-1/2 h-screen " + className}></div>;
};
