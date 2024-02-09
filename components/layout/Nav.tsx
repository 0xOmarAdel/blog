import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

const Nav = () => {
  return (
    <nav className="bg-white py-5 px-72 flex flex-row justify-between items-center shadow-sm">
      <Link href="/" className="text-4xl text-primary font-semibold">
        Blog
      </Link>
      <ul className="flex flex-row gap-5 text-lg text-gray-500 font-medium">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Top Articles</Link>
        </li>
        <li>
          <Link href="/">All Articles</Link>
        </li>
        <li>
          <Link href="/">Contact Us</Link>
        </li>
      </ul>
      <div className="relative ">
        <input
          type="text"
          placeholder="Search..."
          className="w-60 py-[5px] px-2 border border-gray-300 rounded-md"
        />
        <div className="absolute top-0 right-0 h-full p-3 bg-primary rounded-ee-md rounded-se-md flex flex-row items-center">
          <AiOutlineSearch className="text-xl text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
