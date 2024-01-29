import { HTMLAttributes } from "react";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: "shadow" | "primary" | "secondary";
};

const buttonVariantsClassNames = {
  shadow:
    "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
  primary:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  secondary:
    "ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",
};

export const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={buttonVariantsClassNames[variant]}
    {...props}
  >
    {children}
  </button>
);
