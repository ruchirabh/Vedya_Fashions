const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  getOrdersByCustomer,
  updateMeasurements
} = require("../controllers/order.controller");

/* ALL ORDER ROUTES – ADMIN PROTECTED */

// Create new order
router.post("/", auth, createOrder);

// Get all orders (with filters)
router.get("/", auth, getAllOrders);

// Get orders by customer
router.get("/customer/:customerId", auth, getOrdersByCustomer);

// Get single order
router.get("/:id", auth, getOrderById);

// Update order status
router.patch("/:id/status", auth, updateOrderStatus);

// Update order (amount, delivery date, notes)
router.put("/:id", auth, updateOrder);

// Delete order
router.delete("/:id", auth, deleteOrder);

router.put("/:id/measurements", auth, updateMeasurements);


module.exports = router;