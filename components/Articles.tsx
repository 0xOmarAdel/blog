import Article from "@/components/Article";
import { articleType } from "@/types/ArticleType";
import { getAllArticles } from "@/db/articleActions";

const Articles = async () => {
  const articles = await getAllArticles();

  return (
    <div>
      {articles.map((article: articleType) => (
        <Article key={article._id} article={article} />
      ))}
    </div>
  );
};

export default Articles;
