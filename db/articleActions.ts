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

    const articleComments = await Comment.find({ article: articleId });

    return articleComments;
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}

export async function createArticle(
  title: string,
  description: string,
  image: File,
  category: string
) {
  try {
    await connectToDB();

    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, async (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);

          const imageURL = result?.secure_url;

          const newArticle = new Article({
            image: imageURL,
            title,
            description,
            category,
          });

          await newArticle.save();
        })
        .end(buffer);
    });

    revalidatePath("/");
    redirect("/");
    return { message: "Article created successfully", status: 201 };
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}

export async function deleteArticle(articleId: string) {
  try {
    await connectToDB();

    await Article.findByIdAndDelete(articleId);

    revalidatePath("/");
    return { message: "Article deleted successfully", status: 200 };
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}
