"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  articleId: string;
};

const CommentForm: React.FC<Props> = ({ articleId }) => {
  const [text, setText] = useState("");

  const { data: session } = useSession();

  if (!session?.user) return;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) return;

    try {
      const response = await fetch("/api/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article: articleId,
          text,
          user: session.user.id,
        }),
      });

      console.log(response);

      const data = await response.json();

      if (response.status === 200) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
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
          name="text"
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
