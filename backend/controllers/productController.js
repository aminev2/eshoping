import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

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


//! @desc Get product count by day
// @route GET /api/products/count-by-day
// @access Private/Admin
const getProductCountByDay = asyncHandler(async (req, res) => {
  const productCountByDay = await Product.aggregate([
    {
      $group: {
        _id: {
          day: { $dayOfYear: "$createdAt" },
          year: { $year: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    }
  ]);

  if (!productCountByDay) {
    res.status(404);
    throw new Error("No data found");
  }

  return res.status(200).json(productCountByDay);
});
  



export { getProducts, getProductById, getProductCountByDay };
