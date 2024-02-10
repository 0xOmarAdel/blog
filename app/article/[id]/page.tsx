import { connectToDB } from "@/db/index";
import Article from "@/models/Article";
import Image from "next/image";

async function getArticle(id) {
  try {
    await connectToDB();

    const article = await Article.findById(id);
    if (!Article) return new Response("Article Not Found", { status: 404 });

    return article;
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}

const page = async ({ params }) => {
  const article = await getArticle(params.id);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full h-[500px]">
        <Image src={article.image} alt="" fill />
      </div>
      <h2 className="text-3xl text-gray-700 font-semibold">{article.title}</h2>
      <p className="text-lg">{article.description}</p>
    </div>
  );
};

export default page;
