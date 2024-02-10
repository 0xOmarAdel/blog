import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
