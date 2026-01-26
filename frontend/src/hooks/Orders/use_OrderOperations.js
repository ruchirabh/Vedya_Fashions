// hooks/Orders/use_OrderOperations.js
import { useState } from "react";
import api from "../../services/api_intercept";

export const use_OrderOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateOrder = async (orderId, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/api/orders/${orderId}`, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/api/orders/${orderId}`);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/orders/${orderId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateOrder,
    deleteOrder,
    getOrder,
    setError,
  };
};