import { CategoryType } from "@/types/CategoryType";
import { getAllCategories } from "@/db/categoryActions";
import { getArticle } from "@/db/articleActions";

const CategoriesList = async () => {
  const categories = await getAllCategories();

  return (
    <div className="col-span-2 space-y-2">
      <h2 className="text-2xl text-primary font-semibold">Categories</h2>
      <div className="flex flex-col gap-2 text-gray-600 font-medium">
        {categories?.map((category: CategoryType) => (
          <div key={category._id} className="flex flex-row justify-between">
            <p>{category.title}</p>
            <span className="py-0.5 px-1.5 bg-primary text-sm text-white rounded-md">
              {category.totalArticles}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
