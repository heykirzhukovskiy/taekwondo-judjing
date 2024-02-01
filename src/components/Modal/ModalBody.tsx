import { HTMLAttributes } from "react";

type ModalBodyProps = HTMLAttributes<HTMLDivElement> & {
  texts: string[];
};

export const ModalBody = ({ texts }: ModalBodyProps) => (
  <div className="p-4 md:p-5 space-y-4">
    {texts.map((text, index) => (
      <p
        className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
        key={index}
      >
        {text}
      </p>
    ))}
  </div>
);
