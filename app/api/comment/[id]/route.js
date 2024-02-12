import { connectToDB } from "@/db";
import Comment from "@/models/Comment";
import { revalidatePath } from "next/cache";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Comment.findByIdAndDelete(params.id);

    revalidatePath("/");

    return new Response(
      JSON.stringify({ message: "Comment deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting comment" }), {
      status: 500,
    });
  }
};
