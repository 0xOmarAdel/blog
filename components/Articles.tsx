import Article from "@/components/Article";
import { articleType } from "@/types/ArticleType";
import { getAllArticles } from "@/db/articleActions";

const Articles = async () => {
  const articles = await getAllArticles();

  return (
    <>
      {articles.map((article: articleType) => (
        <Article key={article._id} article={article} />
      ))}
    </>
  );
};

export default Articles;
