const Order = require("../models/Order");
const Customer = require("../models/Customer");

/* ================= CREATE ORDER ================= */
exports.createOrder = async (req, res) => {
  try {
    const {
      customerId,
      garmentType,
      measurements, // Generic measurements object
      blouseMeasurements, // Specific blouse measurements
      bottomWearMeasurements, // Specific bottom wear measurements
      totalAmount,
      advanceAmount,
      deliveryDate,
      notes,
    } = req.body;

    // Validate required fields
    if (!customerId || !garmentType || !totalAmount) {
      return res.status(400).json({
        message: "Customer, garment type, and amount are required",
      });
    }

    // Get customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Determine which measurements to use based on garment type
    let customerMeasurements = {};
    let needsMeasurements = false;
    let providedMeasurements = null;

    // Check if measurements were provided in the request
    if (garmentType === "blouse") {
      providedMeasurements = blouseMeasurements || measurements;
      
      if (
        !customer.blouseMeasurements ||
        Object.keys(customer.blouseMeasurements).length === 0
      ) {
        needsMeasurements = true;
      } else {
        customerMeasurements = { ...customer.blouseMeasurements.toObject() };
      }
    } else {
      providedMeasurements = bottomWearMeasurements || measurements;
      
      if (
        !customer.bottomWearMeasurements ||
        Object.keys(customer.bottomWearMeasurements).length === 0
      ) {
        needsMeasurements = true;
      } else {
        customerMeasurements = {
          ...customer.bottomWearMeasurements.toObject(),
        };
      }
    }

    // If measurements are provided in request, save them to customer profile
    if (providedMeasurements && Object.keys(providedMeasurements).length > 0) {
      console.log("📝 Saving new measurements to customer:", providedMeasurements);
      
      if (garmentType === "blouse") {
        customer.blouseMeasurements = providedMeasurements;
      } else {
        customer.bottomWearMeasurements = providedMeasurements;
      }
      
      customer.measurementsTaken = true;
      customer.measurementDate = new Date();
      
      try {
        await customer.save();
        console.log("✅ Measurements saved successfully");
        customerMeasurements = providedMeasurements;
        needsMeasurements = false;
      } catch (saveError) {
        console.error("❌ Error saving measurements:", saveError);
        return res.status(500).json({
          message: "Failed to save measurements",
          error: saveError.message,
        });
      }
    }

    // If still needs measurements and none provided, return error
    if (needsMeasurements) {
      console.log("⚠️ Measurements required but not provided");
      return res.status(400).json({
        message: "Customer measurements required for this garment type",
        needsMeasurements: true,
        garmentType,
      });
    }

    // Snapshot customer info
    const customerSnapshot = {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      photo: customer.photo,
    };

    // Create order with measurements
    const order = await Order.create({
      customer: customerId,
      customerSnapshot,
      garmentType,
      measurements: customerMeasurements,
      totalAmount,
      advanceAmount: advanceAmount || 0,
      deliveryDate,
      notes,
    });

    // Populate customer reference
    await order.populate("customer", "name phone photo");

    console.log("✅ Order created successfully with measurements");

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Create order error:", error);
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/* ================= GET ALL ORDERS ================= */
exports.getAllOrders = async (req, res) => {
  try {
    const { status, garmentType, search } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (garmentType) filter.garmentType = garmentType;

    // Search by order number or customer name
    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customerSnapshot.name": { $regex: search, $options: "i" } },
        { "customerSnapshot.phone": { $regex: search, $options: "i" } },
      ];
    }

    const orders = await Order.find(filter)
      .populate("customer", "name phone photo")
      .sort({ createdAt: -1 });

    res.json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET SINGLE ORDER ================= */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "customer",
      "name phone photo address blouseMeasurements bottomWearMeasurements",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    ).populate("customer", "name phone photo");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ORDER ================= */
exports.updateOrder = async (req, res) => {
  try {
    const updateData = req.body;

    // Prevent updating customer reference or snapshots
    delete updateData.customer;
    delete updateData.customerSnapshot;
    delete updateData.measurements;
    delete updateData.orderNumber;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("customer", "name phone photo");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ORDER ================= */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ORDERS BY CUSTOMER ================= */
exports.getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.customerId }).sort({
      createdAt: -1,
    });

    res.json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE CUSTOMER MEASUREMENTS ================= */
exports.updateMeasurements = async (req, res) => {
  try {
    const { garmentType, measurements } = req.body;

    if (!garmentType || !measurements) {
      return res
        .status(400)
        .json({ message: "Garment type and measurements required" });
    }

    const update =
      garmentType === "blouse"
        ? { 
            blouseMeasurements: measurements,
            measurementsTaken: true,
            measurementDate: new Date()
          }
        : { 
            bottomWearMeasurements: measurements,
            measurementsTaken: true,
            measurementDate: new Date()
          };

    const customer = await Customer.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
      message: "Measurements saved successfully",
      customer,
    });
  } catch (error) {
    console.error("Update measurements error:", error);
    res.status(500).json({ message: error.message });
  }
};