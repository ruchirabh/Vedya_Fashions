const Customer = require("../models/Customer");
const Order = require("../models/Order");

/* ================= CREATE CUSTOMER ================= */
// Controller: createCustomer
exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, address, gender } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const existingCustomer = await Customer.findOne({ phone, name });
    if (existingCustomer) {
      return res.status(409).json({
        message: "Customer already exists",
        customer: existingCustomer,
      });
    }

    // Get photo URL from uploaded file (Cloudinary or local path)
    const photoUrl = req.file ? req.file.path : null;

    const customer = await Customer.create({
      name,
      phone,
      photo: photoUrl,
      address: address || "",
      gender: gender || "other",
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL CUSTOMERS ================= */
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.json({
      count: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET SINGLE CUSTOMER ================= */
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const lastOrder = await Order.findOne({
      customer: customer._id,
    })
      .sort({ createdAt: -1 })
      .select(
        "orderNumber garmentType status totalAmount deliveryDate createdAt"
      );

    res.json({
      ...customer.toObject(),
      lastOrder: lastOrder || null,
    });
  } catch (error) {
    console.error("GET CUSTOMER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE CUSTOMER ================= */
exports.updateCustomer = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.photo = req.file.path; // Cloudinary URL
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE CUSTOMER ================= */
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* ================= SEARCH CUSTOMERS ================= */
exports.searchCustomers = async (req, res) => {
  try {
    const { q } = req.query; // search query

    if (!q) {
      return res.status(400).json({ message: "Search query required" });
    }

    const customers = await Customer.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ],
    })
      .select("name phone photo")
      .limit(10);

    res.json({
      count: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
