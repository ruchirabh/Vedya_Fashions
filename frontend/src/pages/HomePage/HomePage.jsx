// pages/HomePage/HomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { use_GetCustomers } from "../../hooks/Customer/use_GetCustomers";
import CustomerGrid from "../../components/Customer/CustomerGrid";
import CustomerDetailsPopup from "../../components/Customer/CustomerDetailsPopup";
import OrderCard from "../../components/Order/OrderCard";
import api from "../../services/api_intercept";

function HomePage() {
  const navigate = useNavigate();
  const { customers, fetchCustomers } = use_GetCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const outletContext = useOutletContext();
  const refreshKey = outletContext?.refreshKey;

  useEffect(() => {
    fetchCustomers();
    fetchRecentOrders();
  }, [fetchCustomers, refreshKey]);

  const fetchRecentOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await api.get("/api/orders?limit=4");
      setRecentOrders(response.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch recent orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleOrderClick = (order) => {
    navigate(`/orders/${order._id}`);
  };

  const latestCustomers = customers.slice(0, 3);
  const latestOrders = recentOrders.slice(0, 3); // Fixed: Use recentOrders instead of orders

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Total Customers</p>
                <p className="text-2xl font-bold text-white">
                  {customers.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">
                  {recentOrders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Date</p>
                <p className="text-2xl font-bold text-white">
                  {new Date().toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Recent Orders Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              Recent Orders
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Latest customer orders
            </p>
          </div>
          <button
            onClick={() => navigate("/orders/all")}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium"
          >
            View All Orders
            <ArrowRight size={18} />
          </button>
        </div>

        {loadingOrders ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-neutral-900 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-48 bg-neutral-800 rounded-xl mb-4"></div>
                <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : latestOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onClick={handleOrderClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-neutral-900 rounded-2xl border border-neutral-800">
            <div className="w-16 h-16 mx-auto mb-4 bg-neutral-800 rounded-full flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No orders yet
            </h3>
            <p className="text-neutral-400 mb-6">
              Create your first order to get started
            </p>
            <button
              onClick={() => navigate("/orders/create")}
              className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
            >
              Create Order
            </button>
          </div>
        )}
      </section>

      {/* Customers Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              Recent Customers
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Latest registered customers
            </p>
          </div>
          <button
            onClick={() => navigate("/customers")}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium"
          >
            View All Customers
            <ArrowRight size={18} />
          </button>
        </div>

        <CustomerGrid
          customers={latestCustomers}
          onCardClick={setSelectedCustomer}
        />

        {customers.length === 0 && (
          <div className="text-center py-12 bg-neutral-900 rounded-2xl border border-neutral-800">
            <div className="w-16 h-16 mx-auto mb-4 bg-neutral-800 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No customers yet
            </h3>
            <p className="text-neutral-400 mb-6">
              Add your first customer to get started
            </p>
          </div>
        )}
      </section>

      {/* Customer Details Popup */}
      {selectedCustomer && (
        <CustomerDetailsPopup
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onUpdated={fetchCustomers}
        />
      )}
    </div>
  );
}

export default HomePage;
