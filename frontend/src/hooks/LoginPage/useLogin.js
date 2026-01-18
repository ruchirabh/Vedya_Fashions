import { useState } from "react";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ name, password }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post(ENDPOINTS.ADMIN_LOGIN, {
        name,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      return res.data; // allow component to react
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
