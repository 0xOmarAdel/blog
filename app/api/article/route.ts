import { v2 as cloudinary } from "cloudinary";
import { connectToDB } from "../../../db";
import Article from "@/models/Article";

export const POST = async (request: Request) => {
  try {
    await connectToDB();
    const formData = (await request.formData()) as FormData;

    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    const arrayBuffer = await image!.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    let newArticleId;
    let imageURL;

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

          imageURL = result?.secure_url;
        })
        .end(buffer);
    });

    const newArticle = new Article({
      image: imageURL,
      title,
      description,
      category,
    });

    await newArticle.save();

    newArticleId = newArticle._id.toString();

    return new Response(
      JSON.stringify({
        message: "Article created successfully",
        articleId: newArticleId,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error creating article" }), {
      status: 500,
    });
  }
};
