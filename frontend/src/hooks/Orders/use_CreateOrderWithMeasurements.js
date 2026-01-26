// hooks/Orders/use_CreateOrderWithMeasurements.js
import { useState } from "react";
import apiClient from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

export const use_CreateOrderWithMeasurements = (customerId, onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [needsMeasurements, setNeedsMeasurements] = useState(false);
  const [measurementData, setMeasurementData] = useState({});
  
  const [form, setForm] = useState({
    garmentType: "",
    totalAmount: "",
    advanceAmount: "",
    deliveryDate: "",
    notes: "",
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const updateMeasurement = (field, value) => {
    setMeasurementData(prev => ({ ...prev, [field]: value }));
  };

  // Check if customer has measurements for the selected garment type
  const checkMeasurements = async () => {
    try {
      setLoading(true);
      
      // Fetch customer details to check existing measurements
      const response = await apiClient.get(ENDPOINTS.GET_CUSTOMER_BY_ID(customerId));
      const customer = response.data;

      console.log("📋 Customer data:", customer);

      // Check if customer has measurements for the selected garment type
      let hasMeasurements = false;
      
      if (form.garmentType === "blouse") {
        hasMeasurements = customer.blouseMeasurements && 
          Object.keys(customer.blouseMeasurements).length > 0;
        console.log("👚 Blouse measurements exist:", hasMeasurements);
      } else if (["salwar", "churidar", "pant"].includes(form.garmentType)) {
        hasMeasurements = customer.bottomWearMeasurements && 
          Object.keys(customer.bottomWearMeasurements).length > 0;
        console.log("👖 Bottom wear measurements exist:", hasMeasurements);
      }

      if (!hasMeasurements) {
        console.log("⚠️ No measurements found, prompting user");
        setNeedsMeasurements(true);
        return false;
      }

      console.log("✅ Measurements already exist");
      setNeedsMeasurements(false);
      return true;
    } catch (error) {
      console.error("Error checking measurements:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    // Validate required fields
    if (!form.garmentType || !form.totalAmount) {
      alert("Please fill all required fields (Garment Type and Total Amount)");
      return;
    }

    setLoading(true);
    try {
      // Prepare order payload
      const payload = {
        customerId,
        garmentType: form.garmentType,
        totalAmount: parseFloat(form.totalAmount),
        advanceAmount: parseFloat(form.advanceAmount) || 0,
        deliveryDate: form.deliveryDate,
        notes: form.notes,
      };

      // If measurements are needed and provided, include them with CORRECT key names
      if (needsMeasurements && Object.keys(measurementData).length > 0) {
        console.log("📝 Adding measurements to order:", measurementData);
        
        if (form.garmentType === "blouse") {
          // ✅ Use correct key name that backend expects
          payload.blouseMeasurements = measurementData;
        } else {
          // ✅ Use correct key name that backend expects
          payload.bottomWearMeasurements = measurementData;
        }
      }

      console.log("📤 Sending payload:", payload);

      // Create order
      const response = await apiClient.post(ENDPOINTS.CREATE_ORDER, payload);

      console.log("✅ Order created:", response.data);
      alert("Order created successfully!");
      
      // Reset form
      setForm({
        garmentType: "",
        totalAmount: "",
        advanceAmount: "",
        deliveryDate: "",
        notes: "",
      });
      setMeasurementData({});
      setNeedsMeasurements(false);
      
      // Call success callback
      onSuccess?.();
    } catch (error) {
      console.error("❌ Create order error:", error);
      console.error("❌ Error response:", error.response?.data);
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        if (error.response.data?.message?.includes("measurements")) {
          setNeedsMeasurements(true);
          alert("Please provide measurements for this customer");
        } else {
          alert(error.response.data?.message || "Validation error");
        }
      } else {
        alert(error.response?.data?.message || "Failed to create order");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    needsMeasurements,
    measurementData,
    updateField,
    updateMeasurement,
    checkMeasurements,
    createOrder,
    setNeedsMeasurements,
  };
};