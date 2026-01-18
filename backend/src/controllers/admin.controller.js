const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= CREATE ADMIN ================= */
exports.createAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const adminExists = await Admin.findOne({ name });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ name, password });

    res.status(201).json({
      message: "Admin created successfully",
      adminId: admin._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ADMIN ================= */
exports.loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
