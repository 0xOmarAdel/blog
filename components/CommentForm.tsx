"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

const CommentForm = () => {
  const { data: session } = useSession();

  if (!session?.user) return;

  return (
    <div className="flex flex-row gap-4">
      <Image
        src={session?.user?.image!}
        width={70}
        height={70}
        className="rounded-full h-fit"
        alt={session?.user?.name!}
      />
      <form className="grow flex flex-col gap-3">
        <textarea name="" className="h-24 rounded-md resize-none" />
        <button
          type="submit"
          className="bg-primary py-2 text-gray-200 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
