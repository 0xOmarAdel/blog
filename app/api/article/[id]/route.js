import { connectToDB } from "@/db";
import Article from "@/models/Article";
import { revalidatePath } from "next/cache";

export const POST = async (request, { params }) => {
  await connectToDB();
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Article.findByIdAndDelete(params.id);

    revalidatePath("/");

    return new Response(
      JSON.stringify({ message: "Article deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting article" }), {
      status: 500,
    });
  }
};
