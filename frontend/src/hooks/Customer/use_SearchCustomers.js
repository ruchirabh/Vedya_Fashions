// hooks/Customer/use_SearchCustomers.js
import { useState } from "react";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

export const use_SearchCustomers = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCustomers = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(ENDPOINTS.SEARCH_CUSTOMERS(query));
      setSearchResults(res.data.customers || res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to search customers");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setError(null);
  };

  return {
    searchResults,
    loading,
    error,
    searchCustomers,
    clearResults,
  };
};