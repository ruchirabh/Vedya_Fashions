require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const adminRoutes = require("./src/routes/admin.routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`SERVFER IS RUNNING ON PORT ${process.env.PORT}`),
);
