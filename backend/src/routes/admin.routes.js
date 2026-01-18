const express = require("express");
const router = express.Router();
const {
  createAdmin,
  loginAdmin,
} = require("../controllers/admin.controller");

router.get("/test", (req, res) => {
  res.json({ message: "Admin route working" });
});
router.post("/create", createAdmin);
router.post("/login", loginAdmin);

module.exports = router;
