import { TbTrash } from "react-icons/tb";
import { deleteArticle } from "@/db/articleActions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

type Props = {
  articleId: string;
};

const DeleteArticleButton: React.FC<Props> = async ({ articleId }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) return;

  const deleteArticleHandler = async () => {
    "use server";

    deleteArticle(articleId);
  };

  return (
    <form action={deleteArticleHandler}>
      <button type="submit">
        <TbTrash className="text-xl" />
      </button>
    </form>
  );
};

export default DeleteArticleButton;
