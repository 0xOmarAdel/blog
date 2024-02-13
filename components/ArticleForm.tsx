"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import revalidate from "@/db/revalidate";
import { toast } from "react-toastify";
import { CategoryType } from "@/types/CategoryType";

type Props = {
  categories: CategoryType[];
};

const ArticleForm: React.FC<Props> = ({ categories }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(
    categories.length > 0 ? categories[0]._id : ""
  );
  const [image, setImage] = useState<File | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !image) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await fetch("/api/article/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200) {
        await revalidate("/");
        router.push(`/article/${data.articleId}`);
      }

      toast.info(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        placeholder="Article title"
        className="py-[5px] px-2 border border-gray-300 rounded-md"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
        placeholder="Article Description"
        className="h-44 rounded-md py-[5px] px-2 border border-gray-300 resize-none"
      />
      <div className="flex flex-row gap-5">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="py-[5px] px-2 border border-gray-300 rounded-md"
        >
          {categories.map((category: CategoryType, index) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          onChange={(e) =>
            setImage(e?.target?.files ? e?.target?.files[0] : null)
          }
        />
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

export default ArticleForm;
