import Image from "next/image";
import { TbTrash } from "react-icons/tb";
import { CommentType } from "@/types/CommentType";
import { deleteComment } from "@/db/commentActions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

type Props = Omit<CommentType, "article">;

const Comment: React.FC<Props> = async ({
  _id,
  text,
  firstName,
  lastName,
  image,
}) => {
  const session = await getServerSession(authOptions);

  const deleteCommentHandler = async () => {
    "use server";

    deleteComment(_id);
  };

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
          <form action={deleteCommentHandler}>
            <button type="submit">
              <TbTrash className="text-xl" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Comment;
