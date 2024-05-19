type KBDProps = React.ComponentProps<"kbd">;

export const KBD = ({ children }: KBDProps) => (
	<kbd className="px-2 py-1.5 uppercase font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
		{children}
	</kbd>
);
