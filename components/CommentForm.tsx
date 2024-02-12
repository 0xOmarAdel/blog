import Image from "next/image";
import { createComment } from "@/db/commentActions";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

type Props = {
  articleId: string;
};

const CommentForm: React.FC<Props> = async ({ articleId }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return;

  async function createArticleHandler(formData: FormData) {
    "use server";

    const text = formData.get("text") as string;

    if (!text) return;

    const response = await createComment(text, articleId, session?.user?.id!);
  }

  return (
    <div className="flex flex-row gap-4">
      <Image
        src={session?.user?.image!}
        width={70}
        height={70}
        className="rounded-full h-fit"
        alt={session?.user?.name!}
      />
      <form className="grow flex flex-col gap-3" action={createArticleHandler}>
        <textarea name="text" className="h-24 rounded-md resize-none" />
        <button
          type="submit"
          className="bg-primary py-2 text-gray-200 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
