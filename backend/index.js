require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const customerRoutes = require("./src/routes/customer.routes");
const multer = require("multer");
const adminRoutes = require("./src/routes/admin.routes");
const orderRoutes = require('./src/routes/order.routes')

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true, // reflect request origin
    credentials: true,
  })
);


connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  // Multer specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Custom file filter error
  if (err.message === "Not an image! Please upload an image file.") {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Fallback
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`SERVFER IS RUNNING ON PORT ${process.env.PORT}`),
);
