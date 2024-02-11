"use client";

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <nav className="bg-white py-5 px-72 flex flex-row justify-between items-center shadow-sm">
      <Link href="/" className="text-4xl text-primary font-semibold">
        Blog
      </Link>
      <div className="relative ">
        <input
          type="text"
          placeholder="Search..."
          className="w-[400px] py-[5px] px-2 border border-gray-300 rounded-md"
        />
        <div className="absolute top-0 right-0 h-full p-3 bg-primary rounded-ee-md rounded-se-md flex flex-row items-center">
          <AiOutlineSearch className="text-xl text-white" />
        </div>
      </div>
      {session?.user ? (
        <div className="flex gap-3 md:Gap-5">
          <Image
            src={session?.user.image!}
            alt="Profile"
            width={37}
            height={37}
            className="rounded-full"
          />
          <button
            onClick={() => signOut}
            className="text-lg text-gray-500 font-medium"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <button onClick={() => signIn("google")}>Sign In</button>
        </>
      )}
    </nav>
  );
};

export default Nav;
