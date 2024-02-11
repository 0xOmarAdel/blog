import { connectToDB } from "@/db/index";
import Comment from "@/models/Comment";

export async function deleteComment(commentId: string) {
  try {
    await connectToDB();

    await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}
