import Image from "next/image";
import { CommentType } from "@/types/CommentType";
import DeleteCommentButton from "./DeleteCommentButton";

type Props = CommentType;

const Comment: React.FC<Props> = async ({ _id, text, user }) => {
  return (
    <div className="flex flex-row gap-2">
      <Image
        src={user.image}
        width={50}
        height={50}
        className="h-fit rounded-full"
        alt={`${user.firstName} ${user.lastName}`}
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-lg text-gray-800 font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p>{text}</p>
        <DeleteCommentButton commentId={_id} />
      </div>
    </div>
  );
};

export default Comment;
