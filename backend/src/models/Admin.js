const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/* Hash password before saving - SIMPLER VERSION */
adminSchema.pre("save", async function () {
  // Only hash if password is modified or new
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("Admin", adminSchema);