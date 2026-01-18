const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    photo: {
      type: String, // image URL
    },

    /* ================= BLOUSE MEASUREMENTS ================= */
    blouseMeasurements: {
      liningType: {
        type: String,
        enum: ["lining", "without_lining"],
      },

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
    },

    /* ================= CHURIDAR / SALWAR / PANT ================= */
    bottomWearMeasurements: {
      type: {
        type: String,
        enum: ["churidar", "salwar", "pant"],
      },

      liningType: {
        type: String,
        enum: ["lining", "without_lining"],
      },

      waist: Number,
      hip: Number,
      thigh: Number,
      knee: Number,
      ankle: Number,

      length: Number,
      rise: Number, // crotch depth
      seat: Number,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  },
);

module.exports = mongoose.model("Customer", customerSchema);
