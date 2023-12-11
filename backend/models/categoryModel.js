// Import necessary modules
import { Schema, model } from "mongoose";

// Create the category schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create and export the Category model
const Category = model("Category", categorySchema);
export default Category ;