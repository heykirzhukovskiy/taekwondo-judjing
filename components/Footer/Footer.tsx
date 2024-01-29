import Link from "next/link";

export const Footer = () => {
  const developedYear = 2024;
  const currentYear = new Date(Date.now()).getFullYear();
  const yearRange =
    developedYear === currentYear
      ? developedYear
      : `${developedYear} - ${currentYear}`;
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {yearRange}{" "}
          <Link href="https://holakirr.com/" className="hover:underline">
            holakirr
          </Link>
          . All Rights Reserved. Developed for{" "}
          <Link
            href="https://alex-fomin.vercel.app/"
            className="hover:underline"
          >
            Alex Fomin
          </Link>
          .
        </span>
      </div>
    </footer>
  );
};
