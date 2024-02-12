import { connectToDB } from "../../../db";
import Comment from "../../../models/Comment";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const { text, article, user } = await request.json();

    const newComment = new Comment({ text, article, user });

    await newComment.save();

    return new Response(
      JSON.stringify({ message: "Comment created successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating comment" }), {
      status: 500,
    });
  }
};
