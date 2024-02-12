import { createArticle } from "@/db/articleActions";
import { getAllCategories } from "@/db/categoryActions";
import { CategoryType } from "@/types/CategoryType";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) redirect("/");

  const categories = await getAllCategories();

  async function createArticleHandler(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!title || !description || !category || !image) return;

    await createArticle(title, description, image, category);
  }

  return (
    <form action={createArticleHandler} className="flex flex-col gap-5">
      <input
        type="text"
        name="title"
        placeholder="Article title"
        className="py-[5px] px-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="description"
        placeholder="Article Description"
        className="h-44 rounded-md py-[5px] px-2 border border-gray-300 resize-none"
      />
      <div className="flex flex-row gap-5">
        <select
          name="category"
          className="py-[5px] px-2 border border-gray-300 rounded-md"
        >
          {categories.map((category: CategoryType) => (
            <option key={category._id} value={category._id.toString()}>
              {category.title}
            </option>
          ))}
        </select>
        <input type="file" name="image" />
      </div>
      <button
        type="submit"
        className="bg-primary py-2 text-gray-200 rounded-md"
      >
        Create
      </button>
    </form>
  );
};

export default page;
