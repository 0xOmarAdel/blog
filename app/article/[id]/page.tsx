import Comment from "@/components/Comment";
import Divider from "@/components/ui/Divider";
import { getArticle, getArticleComments } from "@/db/articleActions";
import Image from "next/image";
import { CommentType } from "@/types/CommentType";
import CommentForm from "@/components/CommentForm";
import DeleteArticleButton from "@/components/DeleteArticleButton";

const page = async ({ params }: { params: { id: string } }) => {
  const article = await getArticle(params.id);
  const articleComments = (await getArticleComments(
    params.id
  )) as CommentType[];

  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full h-[500px]">
        <Image src={article.image} alt="" fill />
      </div>
      <div className="flex flex-row items-center gap-3">
        <h2 className="text-3xl text-gray-700 font-semibold">
          {article.title}
        </h2>
        <DeleteArticleButton articleId={params.id} />
      </div>
      <p className="text-lg">{article.description}</p>
      <Divider />
      <div className="flex flex-col gap-6">
        <CommentForm articleId={params.id} />
        {articleComments.map((comment: CommentType) => (
          <Comment
            key={comment._id}
            _id={comment._id.toString()}
            text={comment.text}
            user={comment.user}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
