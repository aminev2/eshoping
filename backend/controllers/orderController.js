import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

//! @desc Create new order
// @route  POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const user = req.user._id;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => {
        return {
          ...item,
          product: item._id,
          _id: undefined, // we have product as Id
        };
      }),
      user: user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).send(createdOrder);
  }
});

//! @desc Get logged user Orders
// @route  GET /api/orders/my-orders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const user = req.user;
  const allOrders = await Order.find({ user: user._id });

  res.status(200).send(allOrders);
});

//! @desc Get Order by ID
// @route  GET /api/orders/:id
// @access Private/Admin

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById({ _id: id }).populate(
    "user",
    "name email isAdmin"
  );

  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404);
    throw new Error("No order Found");
  }
});

//! @desc Update Order TO PAID
// @route  PUT /api/orders/:id/pay
// @access Private/Admin

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.send(`Update order  State to Paid  ${id}`);
});

//! @desc Update Order TO Delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.send(`Update order  State to Delivered By ${id}`);
});

//! @desc Get All Orders
// @route  GET /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  res.send(`Get all orders`);
});

export {
  addOrderItems,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
};
