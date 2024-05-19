import { Button, type ButtonProps } from "..";

type ModalFooterProps = React.ComponentProps<"div"> & {
	actions: ButtonProps[];
};

export const ModalFooter = ({ actions }: ModalFooterProps) => (
	<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
		{actions.map((action) => (
			<Button key={action.label} {...action} />
		))}
	</div>
);
