"use client";

import { TbTrash } from "react-icons/tb";
import { useSession } from "next-auth/react";

type Props = {
  commentId: string;
};

const DeleteCommentButton: React.FC<Props> = ({ commentId }) => {
  const { data: session } = useSession();

  if (!session?.user?.isAdmin) return;

  const deleteCommentHandler = async () => {
    try {
      const response = await fetch(`/api/comment/${commentId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <TbTrash className="text-xl" onClick={() => deleteCommentHandler()} />;
};

export default DeleteCommentButton;
