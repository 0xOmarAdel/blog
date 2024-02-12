"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { TbTrash } from "react-icons/tb";
import { deleteArticle } from "@/db/articleActions";

type Props = {
  articleId: string;
};

const DeleteArticleButton: React.FC<Props> = ({ articleId }) => {
  const { data: session } = useSession()

  if (!session?.user?.isAdmin) return;

  return (
    <TbTrash className="text-xl" onClick={() => deleteArticle(articleId)} />
  );
};

export default DeleteArticleButton;
