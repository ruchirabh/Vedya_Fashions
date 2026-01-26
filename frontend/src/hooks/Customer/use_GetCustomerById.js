import { useState, useCallback } from "react";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

export const use_GetCustomerById = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomer = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(ENDPOINTS.GET_CUSTOMER_BY_ID(id));
      setCustomer(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch customer");
    } finally {
      setLoading(false);
    }
  }, []);

  return { customer, fetchCustomer, loading, error };
};
