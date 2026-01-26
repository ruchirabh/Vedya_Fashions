// models/Customer.js - Add measurement fields
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    // Blouse Measurements
    blouseMeasurements: {
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
    },
    // Bottom Wear Measurements (for salwar, churidar, pant)
    bottomWearMeasurements: {
      pantType: String,
      thigh: Number,
      knee: Number,
      ankle: Number,
      length: Number,
      rise: Number,
      seat: Number,
    },
    // Track measurement completion
    measurementsTaken: {
      type: Boolean,
      default: false,
    },
    measurementDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);