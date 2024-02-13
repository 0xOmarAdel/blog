import { getAllCategories } from "@/db/categoryActions";
import ArticleForm from "@/components/ArticleForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { CategoryType } from "@/types/CategoryType";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const categories = await getAllCategories();

  const modifiedCategories = categories?.map((category) => {
    return { ...category, _id: category._id.toString() };
  }) as CategoryType[];

  if (!session?.user?.isAdmin || !categories) redirect("/");

  return <ArticleForm categories={modifiedCategories} />;
};

export default Page;
