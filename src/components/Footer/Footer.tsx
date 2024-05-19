import { DEVELOPED_YEAR } from "../../const";

export const Footer = () => {
	const currentYear = new Date(Date.now()).getFullYear();
	const yearRange =
		DEVELOPED_YEAR === currentYear
			? DEVELOPED_YEAR
			: `${DEVELOPED_YEAR} - ${currentYear}`;
	return (
		<footer className="bg-white dark:bg-gray-800">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© {yearRange} Developed by{" "}
					<a href="https://holakirr.com/" className="hover:underline">
						Kirill Petunin
					</a>{" "}
					for{" "}
					<a href="https://alex-fomin.vercel.app/" className="hover:underline">
						Alexander Fomin
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};
