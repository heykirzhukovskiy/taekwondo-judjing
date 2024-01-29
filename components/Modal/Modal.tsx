import { HTMLAttributes } from "react";
import { ButtonProps } from "..";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

type ModalProps = HTMLAttributes<HTMLDialogElement> & {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  actions?: ButtonProps[];
  texts?: string[];
};

export const Modal = ({
  onClose,
  isOpen,
  title,
  actions,
  texts,
}: ModalProps) => (
  <dialog
    id="default-modal"
    tabIndex={-1}
    aria-hidden="true"
    className={
      "overflow-y-auto overflow-x-hidden top-0 right-0 z-50 justify-center items-center h-screen w-screen backdrop-filter:blur-sm backdrop-brightness-50 bg-transparent" +
      (isOpen ? " flex" : "")
    }
    open={isOpen}
  >
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <ModalHeader onClose={onClose} title={title} />
        {texts && <ModalBody texts={texts} />}
        {actions && <ModalFooter actions={actions} />}
      </div>
    </div>
  </dialog>
);
