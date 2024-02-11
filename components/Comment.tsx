import Image from "next/image";
import { CommentType } from "@/types/CommentType";

type Props = {
  comment: CommentType;
};

const Comment: React.FC<Props> = ({ comment }) => {
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
      </div>
    </div>
  );
};

export default Comment;
