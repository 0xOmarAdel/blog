import { connectToDB } from "@/db";
import Article from "@/models/Article";

export const POST = async (request, { params }) => {
  await connectToDB();
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Article.findByIdAndDelete(params.id);

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
