"use client";

import { useState, useEffect } from "react";
import { CategoryType } from "@/types/CategoryType";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/category");
    const data = await response.json();

    setCategories(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {categories?.map((category: CategoryType) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </div>
  );
};

export default CategoriesList;
