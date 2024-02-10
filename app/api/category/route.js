import { connectToDB } from "@/db/index";
import Category from "@/models/Category";
import Article from "@/models/Article";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const categories = await Category.find({});

    // Fetch the number of articles for each category
    const categoriesWithArticleCount = await Promise.all(
      categories.map(async (category) => {
        const totalArticles = await Article.countDocuments({
          category: category._id,
        });
        return {
          ...category.toObject(),
          totalArticles,
        };
      })
    );

    return new Response(JSON.stringify(categoriesWithArticleCount), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
