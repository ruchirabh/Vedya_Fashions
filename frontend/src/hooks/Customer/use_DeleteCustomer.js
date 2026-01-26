import { useState } from "react";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

export const use_DeleteCustomer = () => {
  const [loading, setLoading] = useState(false);

  const deleteCustomer = async (id) => {
    setLoading(true);
    await api.delete(ENDPOINTS.DELETE_CUSTOMER(id));
    setLoading(false);
  };

  return { deleteCustomer, loading };
};
