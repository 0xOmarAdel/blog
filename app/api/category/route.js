import { connectToDB } from "@/db/index";
import Category from "@/models/Category";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const categories = await Category.find({});

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
