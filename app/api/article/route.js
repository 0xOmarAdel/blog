import { connectToDB } from "@/db/index";
import Article from "@/models/Article";
import Comment from "@/models/Comment";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const articles = await Article.find({});

    const articlesWithCommentCount = await Promise.all(
      articles.map(async (article) => {
        const comments = await Comment.countDocuments({
          article: article._id,
        });
        return {
          ...article.toObject(),
          comments,
        };
      })
    );

    return new Response(JSON.stringify(articlesWithCommentCount), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
