"use client";

import { useEffect, useState } from "react";
import Article from "@/components/Article";
import { articleType } from "@/types/ArticleType";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/article");
      const data = await response.json();

      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {articles.map((article: articleType) => (
        <Article key={article._id} article={article} />
      ))}
    </div>
  );
};

export default Articles;
