"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { createComment } from "@/db/commentActions";
import React, { useState } from "react";

const CommentForm = ({ articleId }) => {
  const { data: session } = useSession();

  const [text, setText] = useState("");

  if (!session?.user) return;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createComment(text, articleId, session?.user?.id);

    console.log(response);
  };

  return (
    <div className="flex flex-row gap-4">
      <Image
        src={session?.user?.image!}
        width={70}
        height={70}
        className="rounded-full h-fit"
        alt={session?.user?.name!}
      />
      <form className="grow flex flex-col gap-3" onSubmit={submitHandler}>
        <textarea
          name=""
          className="h-24 rounded-md resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
