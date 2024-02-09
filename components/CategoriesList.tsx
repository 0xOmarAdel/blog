"use client";

import { useState, useEffect } from "react";
import { CategoryType } from "@/types/CategoryType";

const CategoriesList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Technology", totalArticles: 50 },
    { id: 2, name: "Science", totalArticles: 40 },
    { id: 3, name: "Sports", totalArticles: 30 },
    { id: 4, name: "Entertainment", totalArticles: 25 },
    { id: 5, name: "Health", totalArticles: 35 },
    { id: 6, name: "Travel", totalArticles: 20 },
    { id: 7, name: "Fashion", totalArticles: 15 },
    { id: 8, name: "Food", totalArticles: 45 },
    { id: 9, name: "Business", totalArticles: 40 },
    { id: 10, name: "Education", totalArticles: 30 },
    { id: 11, name: "Music", totalArticles: 25 },
    { id: 12, name: "Art", totalArticles: 20 },
    { id: 13, name: "Politics", totalArticles: 30 },
    { id: 14, name: "Fitness", totalArticles: 15 },
    { id: 15, name: "Lifestyle", totalArticles: 40 },
    { id: 16, name: "Nature", totalArticles: 25 },
    { id: 17, name: "Gaming", totalArticles: 35 },
    { id: 18, name: "Books", totalArticles: 20 },
    { id: 19, name: "Movies", totalArticles: 30 },
    { id: 20, name: "History", totalArticles: 25 },
  ]);

  return (
    <div className="col-span-2 space-y-2">
      <h2 className="text-2xl text-primary font-semibold">Categories</h2>
      <div className="flex flex-col gap-2 text-gray-600 font-medium">
        {categories?.map((category: CategoryType) => (
          <div key={category.id} className="flex flex-row justify-between">
            <p>{category.name}</p>
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
