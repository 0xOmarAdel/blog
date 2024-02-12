"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { TbTrash } from "react-icons/tb";
import { CommentType } from "@/types/CommentType";
import { deleteComment } from "@/db/commentActions";

type Props = Omit<CommentType, "article">;

const Comment: React.FC<Props> = ({
  _id,
  text,
  firstName,
  lastName,
  image,
}) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row gap-2">
      <Image
        src={image}
        width={50}
        height={50}
        className="rounded-full"
        alt={`${firstName} ${lastName}`}
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-lg text-gray-800 font-medium">
          {firstName} {lastName}
        </p>
        <p>{text}</p>
        {session?.user.isAdmin && (
          <TbTrash onClick={() => deleteComment(_id)} />
        )}
      </div>
    </div>
  );
};

export default Comment;
