import Comment from "@/components/Comment";
import Divider from "@/components/ui/Divider";
import { getArticle, getArticleComments } from "@/db/articleActions";
import Image from "next/image";
import { CommentType } from "@/types/CommentType";

const page = async ({ params }) => {
  const article = await getArticle(params.id);
  const articleComments = (await getArticleComments(
    params.id
  )) as CommentType[];

  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full h-[500px]">
        <Image src={article.image} alt="" fill />
      </div>
      <h2 className="text-3xl text-gray-700 font-semibold">{article.title}</h2>
      <p className="text-lg">{article.description}</p>
      <Divider />
      <div className="flex flex-col gap-6">
        {articleComments.map((comment: CommentType) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default page;
