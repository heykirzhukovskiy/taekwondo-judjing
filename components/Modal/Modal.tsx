import { FormParam, FormStateType, formInputs } from "@/const";
import { HTMLAttributes } from "react";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

type ModalProps = HTMLAttributes<HTMLDialogElement> & {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  formState: FormStateType;
  onFormUpdate: (param: FormParam, value: FormStateType[FormParam]) => void;
};

export const Modal = ({
  onClose,
  isOpen,
  onStart,
  formState,
  onFormUpdate,
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
        <ModalHeader onClose={onClose} title="Настройте бой" />
        <form className="flex flex-col p-3">
          {formInputs.map(({ name, type, label }) => (
            <div className="mb-5" key={name}>
              <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {label}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={label}
                required
                id={name}
                name={name}
                value={formState[name]}
                type={type}
                onChange={(e) => onFormUpdate(name, e.target.value)}
              />
            </div>
          ))}
        </form>
        <ModalFooter
          actions={[
            { children: "Начать", onClick: onStart, variant: "primary" },
            { children: "Закрыть", onClick: onClose, variant: "shadow" },
          ]}
        />
      </div>
    </div>
  </dialog>
);
