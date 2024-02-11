import { connectToDB } from "@/db/index";
import Comment from "@/models/Comment";

export async function createComment(
  text: string,
  article: string,
  user: string
) {
  try {
    await connectToDB();

    const newComment = new Comment({ text, article, user });

    await newComment.save();

    return { message: "Comment created successfully", status: 201 };
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}

export async function deleteComment(commentId: string) {
  try {
    await connectToDB();

    await Comment.findByIdAndDelete(commentId);

    return { message: "Comment deleted successfully", status: 200 };
  } catch (error) {
    return { message: "Internal Server Error", status: 500 };
  }
}
