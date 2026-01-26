const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers
} = require("../controllers/customer.controller");

/* ALL CUSTOMER ROUTES – ADMIN PROTECTED */
router.get("/search", auth, searchCustomers);
router.get("/", auth, getAllCustomers);
router.get("/:id", auth, getCustomerById);
router.put("/:id", auth, upload.single("photo"), updateCustomer);

router.delete("/:id", auth, deleteCustomer);

// Create customer with photo upload
router.post("/", auth, upload.single("photo"), createCustomer);
module.exports = router;
