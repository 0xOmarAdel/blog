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

export async function getArticleComments(articleId: string) {
  try {
    await connectToDB();

    const articleComments = await Comment.find({ article: articleId });

    return articleComments;
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}

export async function deleteArticle(articleId: string) {
  try {
    await connectToDB();

    await Article.findByIdAndDelete(articleId);

    return { message: "Article deleted successfully", status: 200 };
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}
