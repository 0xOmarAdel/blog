"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const NewArticleLink = () => {
  const { data: session } = useSession();

  if (!session?.user?.isAdmin) return;

  return (
    <Link
      href="new"
      className="block w-full bg-primary py-2 px-3 text-gray-200 font-medium rounded-md"
    >
      New Article
    </Link>
  );
};

export default NewArticleLink;
