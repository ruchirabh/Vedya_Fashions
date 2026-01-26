// pages/OrdersPage/AllOrdersPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Download } from "lucide-react";
import OrderCard from "../../components/Order/OrderCard";
import api from "../../services/api_intercept";
import { ENDPOINTS } from "../../config/endpoints";

function AllOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [garmentFilter, setGarmentFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/orders");
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      order.customerSnapshot?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerSnapshot?.phone?.includes(searchTerm);

    // Status filter
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    // Garment type filter
    const matchesGarment =
      garmentFilter === "all" || order.garmentType === garmentFilter;

    return matchesSearch && matchesStatus && matchesGarment;
  });

  const handleOrderClick = (order) => {
    navigate(`/orders/${order._id}`);
  };

  const getStatusCount = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
              All Orders
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Total: {orders.length} orders • Pending:{" "}
              {getStatusCount("not_started")} • In Progress:{" "}
              {getStatusCount("in_progress")} • Completed:{" "}
              {getStatusCount("finished") + getStatusCount("delivered")}
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by customer name, order #, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg focus:outline-none focus:border-yellow-500"
          >
            <option value="all">All Status</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="finished">Finished</option>
            <option value="delivered">Delivered</option>
          </select>

          {/* Garment Type Filter */}
          <select
            value={garmentFilter}
            onChange={(e) => setGarmentFilter(e.target.value)}
            className="px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg focus:outline-none focus:border-yellow-500"
          >
            <option value="all">All Garment Types</option>
            <option value="blouse">Blouse</option>
            <option value="salwar">Salwar</option>
            <option value="churidar">Churidar</option>
            <option value="pant">Pant</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg flex items-center gap-2"
          >
            <Filter size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading orders...</p>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-neutral-800 rounded-full flex items-center justify-center">
            <Search size={40} className="text-neutral-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No orders found
          </h3>
          <p className="text-neutral-400 mb-6">
            {searchTerm || statusFilter !== "all" || garmentFilter !== "all"
              ? "Try adjusting your filters"
              : "No orders have been created yet"}
          </p>
          <button
            onClick={() => navigate("/orders/create")}
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
          >
            Create First Order
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onClick={handleOrderClick}
            />
          ))}
        </div>
      )}

      {/* Order Summary Footer */}
      {!loading && filteredOrders.length > 0 && (
        <div className="mt-8 pt-6 border-t border-neutral-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-neutral-400">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
            <div className="flex gap-4">
              <div className="text-sm">
                <span className="text-neutral-400">Total Value: </span>
                <span className="text-white font-bold">
                  ₹
                  {orders
                    .reduce((sum, order) => sum + order.totalAmount, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-neutral-400">Pending Balance: </span>
                <span className="text-yellow-400 font-bold">
                  ₹
                  {orders
                    .reduce((sum, order) => sum + order.balanceAmount, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrdersPage;
