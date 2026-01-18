const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

/* ALL CUSTOMER ROUTES – ADMIN PROTECTED */
router.post("/", auth, createCustomer);
router.get("/", auth, getAllCustomers);
router.get("/:id", auth, getCustomerById);
router.put("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;
