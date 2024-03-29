"use server";

import { connectToDB } from "@/db/index";
import Article from "@/models/Article";
import Comment from "@/models/Comment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

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

    const articleComments = await Comment.find({ article: articleId }).populate(
      "user"
    );

    return articleComments;
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}
