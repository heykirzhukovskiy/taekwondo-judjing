import { HTMLAttributes } from "react";
import { Button, ButtonProps } from "..";

type ModalFooterProps = HTMLAttributes<HTMLDivElement> & {
  actions: ButtonProps[];
};

export const ModalFooter = ({ actions }: ModalFooterProps) => (
  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
    {actions.map((action, index) => (
      <Button key={index} {...action} />
    ))}
  </div>
);
