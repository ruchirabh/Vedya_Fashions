import { useState } from "react";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

export const use_CreateOrder = (customerId, onSuccess) => {
  const [form, setForm] = useState({
    garmentType: "",
    totalAmount: "",
    advanceAmount: "",
    deliveryDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const createOrder = async () => {
    if (!form.garmentType || !form.totalAmount) {
      alert("Garment type & total amount required");
      return;
    }

    try {
      setLoading(true);

      await api.post(ENDPOINTS.CREATE_ORDER, {
        customerId,
        ...form,
      });

      onSuccess?.();

      // reset form after success
      setForm({
        garmentType: "",
        totalAmount: "",
        advanceAmount: "",
        deliveryDate: "",
        notes: "",
      });
    } catch (error) {
      console.error("Create order failed:", error);
      alert("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    updateField,
    createOrder,
  };
};
