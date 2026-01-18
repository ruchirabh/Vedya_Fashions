require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const adminRoutes = require("./src/routes/admin.routes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`SERVFER IS RUNNING ON PORT ${process.env.PORT}`),
);
