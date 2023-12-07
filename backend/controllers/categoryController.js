import { Category } from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const addCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const allCategories = await Category.find({});
    console.log("fetched all categories", allCategories);
    res.status(200).json(allCategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
if (category) {
    await Category.deleteOne({_id: category.id});
    res.json({ message: 'Category removed' });
}else{
    throw new Error('Category not found');
}
})