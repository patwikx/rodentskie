import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 dark:text-white light:text-black sm:text-xl rounded md:p-0 hover:text-black hover:bg-white dark:hover:bg-black dark:hover:text-white transition-colors duration-300 ease-in-out"
    >
      {title}
    </Link>
  );
};

export default NavLink;
