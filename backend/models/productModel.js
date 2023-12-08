import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: Array,
      required: false,
    },

    price: {
      type: Number,
      require: true,
    },

    sizes: {
      type: Array,
    },

    description: {
      type: String,
      required: true,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to update countInStock when order isPaid is set to true
export const updateProductStock = async (order) => {
  try {
    const orderItems = order.orderItems;

    for (const orderItem of orderItems) {
      const product = await Product.findById(orderItem.product);

      if (product) {
        // Subtract the ordered quantity from the countInStock
        product.countInStock -= orderItem.qty;

        // Save the updated product
        await product.save();
      }
    }

    console.log("Product stock updated successfully.");
  } catch (error) {
    console.error("Error updating product stock:", error);
  }
};

const Product = model("Product", productSchema);

export default Product;
