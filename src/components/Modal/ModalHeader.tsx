import { Button, CloseIcon } from "..";

type ModalProps = React.ComponentProps<"div"> & {
	onClose?: () => void;
	title: string;
};

export const ModalHeader = ({ onClose, title }: ModalProps) => (
	<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
		<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
			{title}
		</h3>
		<Button variant="shadow" onClick={onClose} label="Close modal">
			<CloseIcon />
			<span className="sr-only">Close modal</span>
		</Button>
	</div>
);
