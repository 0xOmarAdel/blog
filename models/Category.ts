import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Category = models.Comment || model("Category", categorySchema);

export default Category;
