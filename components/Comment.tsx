"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { TbTrash } from "react-icons/tb";
import { CommentType } from "@/types/CommentType";
import { deleteComment } from "@/db/commentActions";

interface UpdatedSession extends Session {
  user: {
    name: string;
    email: string;
    image: string;
    isAdmin: boolean;
  };
}

type Props = {
  comment: CommentType;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const { data: session } = useSession() as { data: UpdatedSession | null };

  return (
    <div className="flex flex-row gap-2">
      <Image
        src={comment.image}
        width={50}
        height={50}
        className="rounded-full"
        alt={`${comment.firstName} ${comment.lastName}`}
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-lg text-gray-800 font-medium">
          {comment.firstName} {comment.lastName}
        </p>
        <p>{comment.text}</p>
        {session?.user.isAdmin && (
          <TbTrash onClick={() => deleteComment(comment._id)} />
        )}
      </div>
    </div>
  );
};

export default Comment;
