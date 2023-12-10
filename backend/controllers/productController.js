import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

//! @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, description } = req.body;

  const image = (await req.files) ? req.files.map((file) => file.path) : null;
  console.log("req files ", req.files);
  console.log("req file ", req.file);
  console.log("name ", name);
  console.log("price ", price);
  console.log("image ", image);
  const product = new Product({
    name,
    price,
    user: req?.user?._id,
    image,
    category: new mongoose.Types.ObjectId(category),
    countInStock: 5,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//! @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.status(200).json(products);
});

//! @desc Fetch  a product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  return res.status(200).send(product);
});

//! @desc Fetch  a product
// @route GET /api/products/:id
// @access Private/Admin

//! @desc Get product count by day
// @route GET /api/products/count-by-day
// @access Private/Admin
const getProductCountByDay = asyncHandler(async (req, res) => {
  const productCountByDay = await Product.aggregate([
    {
      $group: {
        _id: {
          day: { $dayOfYear: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  if (!productCountByDay) {
    res.status(404);
    throw new Error("No data found");
  }

  return res.status(200).json(productCountByDay);
});

//! @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product.id });
    res.json({ message: "Product removed" });
  } else {
    throw new Error("Product not found");
  }
});

//! @desc Update product
// @route UPDATE /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { name, price, category, description } = req.body;

  const image = req.files ? req.files.map((file) => file.path) : null;
  console.log("req file ", req.file);

  // Assuming you have a method like `Product.findById` to find the existing product
  const existingProduct = await Product.findById(productId);

  if (existingProduct) {
    existingProduct.name = name || existingProduct.name;
    existingProduct.price = price || existingProduct.price;
    existingProduct.category = category || existingProduct.category;
    existingProduct.description = description || existingProduct.description;

    if (image) {
      existingProduct.image = image;
    }

    const updatedProduct = await existingProduct.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export {
  getProducts,
  getProductById,
  getProductCountByDay,
  createProduct,
  deleteCategory,
  updateProduct,
};
