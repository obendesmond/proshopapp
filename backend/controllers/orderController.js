import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// asyncHandler is an middleware used to handle exceptions (errors) replaces tryCatch

// @desc Create New Order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400); //bad request
    throw new Error("No order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc GET all logged in user orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  try {
    // get all users orders
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json(orders);
  } catch (error) {
    throw new Error(`${error}`);
  }
});

// @desc Get specific order
// @route GET /api/orders/id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  // get specific order and add the users name and email too
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route PUT /api/orders/id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  // get specific order and add the users name and email too
  const order = await Order.findById(req.params.id);
  console.log("order id: " + order._id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // payment result from paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // save updated order
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc GET all orders
// @route GET /api/orders
// @access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  try {
    // get all orders and include the owners id and name
    const orders = await Order.find({}).populate("user", "id name");

    res.status(200).json(orders);
  } catch (error) {
    throw new Error(`${error}`);
  }
});

// @desc Update order to delivered
// @route PUT /api/orders/id/deliver
// @access Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // get specific order and add the users name and email too
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // save updated order
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
