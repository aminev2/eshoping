import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category,
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Fetch all products
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

//! @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 *!@description Create a new product review
 * @route POST /api/products/:id/reviews
 * @access Private
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @throws {Error} If the product is not found or the user has already reviewed the product
 */

const createProductReview = asyncHandler(async (req, res) => {
  // Extracting product ID, rating, and comment from the request body
  const { id } = req.params;
  const { rating, comment } = req.body;

  // Find the product by ID
  const product = await Product.findById(id);

  // Check if the product exists
  if (product) {
    // Check if the user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    // If the user has already reviewed, return an error
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // Create a new review object
    const newReview = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Add the new review to the product's reviews array
    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;

    // Calculate the average rating of the product based on all reviews
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    // Save the updated product
    await product.save();

    // Send a success response
    res.status(201).json({ message: "Review added successfully" });
  } else {
    // If the product is not found, return a 404 error
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById, createProductReview, createProduct };
