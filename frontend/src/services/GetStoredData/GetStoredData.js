// services/GetStoredData/GetStoredData.js
export const getStoredToken = () => {
  return localStorage.getItem("token");
};

export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};