import { connectToDB } from "@/db/index";
import Article from "@/models/Article";
import Comment from "@/models/Comment";

export async function getArticle(id: string) {
  try {
    await connectToDB();

    const article = await Article.findById(id);

    return article;
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}

export async function getAllArticles() {
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

    return articlesWithCommentCount;
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}
