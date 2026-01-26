// config/endpoints.js
const BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  ADMIN_LOGIN: `/api/admin/login`,
  CREATE_CUSTOMER: '/api/customers',
  GET_CUSTOMERS: "/api/customers",
  GET_CUSTOMER_BY_ID: (id) => `/api/customers/${id}`,
  UPDATE_CUSTOMER: (id) => `/api/customers/${id}`,
  DELETE_CUSTOMER: (id) => `/api/customers/${id}`,
  SEARCH_CUSTOMERS: (query) => `/api/customers/search?q=${query}`,
  CREATE_ORDER: `/api/orders`,
  GET_ORDERS: (params = '') => `/api/orders${params ? `?${params}` : ''}`,
  GET_ORDER_BY_ID: (id) => `/api/orders/${id}`,
  UPDATE_ORDER: (id) => `/api/orders/${id}`,
  DELETE_ORDER: (id) => `/api/orders/${id}`,
  SAVE_MEASUREMENTS: (customerId) => `/api/customers/${customerId}/measurements`,
};