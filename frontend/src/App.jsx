import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";

import PublicRoute from "./routes/PublicRoute";
import CustomersPage from "./pages/CustomersPage/CustomersPage";
import CreateOrderPage from "./pages/OrdersPage/CreateOrderPage";
import PlaceOrderPage from "./pages/OrdersPage/PlaceOrderPage";
import AllOrdersPage from "./pages/OrdersPage/AllOrdersPage";
import OrderDetailsPage from "./pages/OrdersPage/OrderDetailsPage"; 
import CreateCustomerPage from "./pages/CustomersPage/CreateCustomerPage";


function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/create" element={<CreateCustomerPage />} />
        <Route path="/orders/create" element={<CreateOrderPage />} />
        <Route path="/orders/place/:customerId" element={<PlaceOrderPage />} />
        <Route path="/orders/all" element={<AllOrdersPage />} />
         <Route path="/orders/:orderId" element={<OrderDetailsPage />} /> 
      </Route>
    </Routes>
  );
}

export default App;
