import { connectToDB } from "@/db/index";
import Category from "@/models/Category";
import Article from "@/models/Article";

export async function getAllCategories() {
  try {
    await connectToDB();

    const categories = await Category.find({});

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

    return categoriesWithArticleCount;
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}
