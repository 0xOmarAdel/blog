"use client";

import { TbTrash } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import revalidate from "@/db/revalidate";
import { toast } from "react-toastify";

type Props = {
  articleId: string;
};

const DeleteArticleButton: React.FC<Props> = ({ articleId }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user?.isAdmin) return;

  const deleteArticleHandler = async () => {
    try {
      const response = await fetch(`/api/article/${articleId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 200) {
        await revalidate("/");
        router.push("/");
      }

      toast.info(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return <TbTrash className="text-xl" onClick={() => deleteArticleHandler()} />;
};

export default DeleteArticleButton;
