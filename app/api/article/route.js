import { connectToDB } from "@/db/index";
import Article from "@/models/Article";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const article = await Article.find({});

    if (!Article) return new Response("Article Not Found", { status: 404 });

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
