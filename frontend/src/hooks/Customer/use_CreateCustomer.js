import { useState, useCallback } from "react";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

export const use_CreateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCustomer = useCallback(async (formData) => {
    setLoading(true);
    setError(null);

    try {
      console.log("📤 Sending FormData with fields:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name} (${value.type}, ${value.size} bytes)`);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Test with direct fetch to bypass axios issues
      const token = localStorage.getItem("token");
      console.log("📤 Using token:", token ? "Yes" : "No");
      
      const response = await api.post(
        ENDPOINTS.CREATE_CUSTOMER,
        formData
      );
      
      console.log("✅ Customer created:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Create customer error:", err);
      console.error("❌ Error status:", err.response?.status);
      console.error("❌ Error data:", err.response?.data);
      console.error("❌ Error headers:", err.response?.headers);
      
      // Try to parse the HTML response
      if (err.response?.data && typeof err.response.data === 'string') {
        console.error("❌ HTML Error Response:", err.response.data);
      }
      
      setError(err.response?.data?.message || "Failed to create customer");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createCustomer, loading, error };
};