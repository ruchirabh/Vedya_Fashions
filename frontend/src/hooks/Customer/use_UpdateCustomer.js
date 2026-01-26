import { useState } from "react";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

export const use_UpdateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCustomer = async (id, payload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.put(ENDPOINTS.UPDATE_CUSTOMER(id), payload);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCustomer, loading, error };
};
