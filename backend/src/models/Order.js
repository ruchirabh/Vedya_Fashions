const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      // required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // Snapshot customer info at order time
    customerSnapshot: {
      name: String,
      phone: String,
      address: String,
      photo: String,
    },

    garmentType: {
      type: String,
      enum: ["blouse", "churidar", "salwar", "pant"],
      required: true,
    },

    measurements: {
      liningType: String,
      sareeFall: Number,
      zigzag: Number,
      bust: Number,
      waist: Number,
      hip: Number,
      sleeveLength: Number,
      sleeveOpening: Number,
      shoulderWidth: Number,
      backWidth: Number,
      frontNeckDepth: Number,
      backNeckDepth: Number,

      pantType: String, // 🔥 FIXED (was "type")

      thigh: Number,
      knee: Number,
      ankle: Number,
      length: Number,
      rise: Number,
      seat: Number,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    advanceAmount: {
      type: Number,
      default: 0,
    },

    balanceAmount: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["not_started", "in_progress", "finished", "delivered"],
      default: "not_started",
    },

    deliveryDate: {
      type: Date,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate order number before saving
orderSchema.pre("save", async function () {
  if (this.isNew) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `ORD${String(count + 1).padStart(5, "0")}`;
  }

  this.balanceAmount = this.totalAmount - this.advanceAmount;
});


module.exports = mongoose.model("Order", orderSchema);
