// pages/OrdersPage/OrderDetailsPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  IndianRupee,
  User,
  Phone,
  MapPin,
  Edit2,
  Trash2,
  Save,
  X,
  Package,
  Clock,
  CheckCircle,
  Truck,
  FileText,
} from "lucide-react";
import api from "../../services/api_intercept";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/orders/${orderId}`);
      setOrder(response.data);
      setForm(response.data);
    } catch (error) {
      console.error("Failed to fetch order:", error);
      alert("Failed to load order details");
      navigate("/orders/all");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (editing) {
      setForm(order); // Reset form to original values
    }
    setEditing(!editing);
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put(`/api/orders/${orderId}`, {
        garmentType: form.garmentType,
        totalAmount: parseFloat(form.totalAmount),
        advanceAmount: parseFloat(form.advanceAmount || 0),
        deliveryDate: form.deliveryDate,
        status: form.status,
        notes: form.notes,
      });

      await fetchOrder(); // Refresh order data
      setEditing(false);
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this order? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/api/orders/${orderId}`);
      alert("Order deleted successfully!");
      navigate("/orders/all");
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order");
      setDeleting(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await api.put(`/api/orders/${orderId}`, { status: newStatus });
      await fetchOrder();
      alert(`Order status updated to ${newStatus.replace("_", " ")}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "not_started":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "in_progress":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "finished":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "delivered":
        return <Truck className="w-5 h-5 text-purple-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "not_started":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "in_progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "finished":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "delivered":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getGarmentIcon = (type) => {
    switch (type) {
      case "blouse":
        return "👚";
      case "salwar":
        return "👘";
      case "churidar":
        return "👗";
      case "pant":
        return "👖";
      default:
        return "👕";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-neutral-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-neutral-800 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 text-neutral-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Order Not Found
          </h3>
          <p className="text-neutral-400 mb-6">
            The order you're looking for doesn't exist
          </p>
          <button
            onClick={() => navigate("/orders/all")}
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const balanceAmount = order.totalAmount - (order.advanceAmount || 0);
  const customer = order.customerSnapshot || {};

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/orders/all")}
            className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Orders</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-neutral-800">
                  <span className="text-3xl">
                    {getGarmentIcon(order.garmentType)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
                    Order #{order.orderNumber}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)} flex items-center gap-2`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.replace("_", " ").toUpperCase()}
                    </span>
                    <span className="text-sm text-neutral-500">
                      Created on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg flex items-center gap-2 transition-colors"
              >
                {editing ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Edit2 className="w-4 h-4" />
                )}
                {editing ? "Cancel" : "Edit"}
              </button>

              {editing ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save"}
                </button>
              ) : (
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Information Card */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-yellow-400" />
                Order Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Garment Type */}
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">
                    Garment Type
                  </label>
                  {editing ? (
                    <select
                      value={form.garmentType || ""}
                      onChange={(e) =>
                        handleInputChange("garmentType", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg"
                    >
                      <option value="blouse">Blouse</option>
                      <option value="salwar">Salwar</option>
                      <option value="churidar">Churidar</option>
                      <option value="pant">Pant</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-700 flex items-center justify-center">
                        <span className="text-xl">
                          {getGarmentIcon(order.garmentType)}
                        </span>
                      </div>
                      <span className="text-lg font-medium">
                        {order.garmentType.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">
                    Status
                  </label>
                  {editing ? (
                    <select
                      value={form.status || ""}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg"
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="finished">Finished</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-lg font-medium">
                        {order.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total Amount */}
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">
                    Total Amount
                  </label>
                  {editing ? (
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                      <input
                        type="number"
                        value={form.totalAmount || ""}
                        onChange={(e) =>
                          handleInputChange("totalAmount", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-yellow-400" />
                      <span className="text-2xl font-bold">
                        {order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Advance Amount */}
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">
                    Advance Amount
                  </label>
                  {editing ? (
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                      <input
                        type="number"
                        value={form.advanceAmount || ""}
                        onChange={(e) =>
                          handleInputChange("advanceAmount", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-green-400" />
                      <span className="text-xl font-bold text-green-400">
                        {order.advanceAmount?.toLocaleString() || "0"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Balance Amount */}
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">
                    Balance Amount
                  </label>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-blue-400" />
                    <span className="text-xl font-bold text-blue-400">
                      {balanceAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">
                    Delivery Date
                  </label>
                  {editing ? (
                    <input
                      type="date"
                      value={
                        form.deliveryDate
                          ? new Date(form.deliveryDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange("deliveryDate", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-neutral-500" />
                      <span className="text-lg">
                        {order.deliveryDate
                          ? new Date(order.deliveryDate).toLocaleDateString()
                          : "Not set"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="text-sm text-neutral-400 mb-1 block flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </label>
                {editing ? (
                  <textarea
                    value={form.notes || ""}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg"
                    placeholder="Add notes about this order..."
                  />
                ) : (
                  <p className="text-neutral-300 bg-neutral-900/50 rounded-lg p-3 min-h-[60px]">
                    {order.notes || "No notes provided"}
                  </p>
                )}
              </div>
            </div>

            {/* Customer Information Card */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-400" />
                Customer Information
              </h2>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Customer Photo */}
                <div className="flex-shrink-0">
                  {customer.photo ? (
                    <img
                      src={customer.photo}
                      alt={customer.name}
                      className="w-24 h-24 rounded-xl object-cover border border-neutral-700"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-neutral-700 flex items-center justify-center border border-neutral-600">
                      <User className="w-12 h-12 text-neutral-400" />
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {customer.name}
                    </h3>
                    {customer.phone && (
                      <div className="flex items-center gap-2 mt-2">
                        <Phone className="w-4 h-4 text-neutral-500" />
                        <span className="text-neutral-300">
                          {customer.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  {customer.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-neutral-500 mt-1 flex-shrink-0" />
                      <span className="text-neutral-300">
                        {customer.address}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => navigate(`/customers/`)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    View Customer Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Status */}
          <div className="space-y-8">
            {/* Status Actions */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">
                Update Status
              </h3>
              <div className="space-y-3">
                {order.status !== "not_started" && (
                  <button
                    onClick={() => handleStatusUpdate("not_started")}
                    className="w-full p-3 text-left rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="font-medium text-white">
                          Mark as Not Started
                        </p>
                        <p className="text-xs text-neutral-400">
                          Reset order status
                        </p>
                      </div>
                    </div>
                  </button>
                )}

                {order.status !== "in_progress" && (
                  <button
                    onClick={() => handleStatusUpdate("in_progress")}
                    className="w-full p-3 text-left rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">
                          Start Production
                        </p>
                        <p className="text-xs text-neutral-400">
                          Move to in progress
                        </p>
                      </div>
                    </div>
                  </button>
                )}

                {order.status !== "finished" && (
                  <button
                    onClick={() => handleStatusUpdate("finished")}
                    className="w-full p-3 text-left rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="font-medium text-white">
                          Mark as Finished
                        </p>
                        <p className="text-xs text-neutral-400">
                          Ready for delivery
                        </p>
                      </div>
                    </div>
                  </button>
                )}

                {order.status !== "delivered" && (
                  <button
                    onClick={() => handleStatusUpdate("delivered")}
                    className="w-full p-3 text-left rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="font-medium text-white">
                          Mark as Delivered
                        </p>
                        <p className="text-xs text-neutral-400">
                          Order delivered
                        </p>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">
                Order Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Order Number</span>
                  <span className="font-mono font-bold">
                    #{order.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Created On</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Last Updated</span>
                  <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="pt-4 border-t border-neutral-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Balance</span>
                    <span className="text-2xl font-bold text-blue-400">
                      ₹{balanceAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/orders/create`)}
                  className="w-full p-3 text-left rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                  Create New Order
                </button>
                <button
                  onClick={() => navigate(`/orders/all`)}
                  className="w-full p-3 text-left rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                  View All Orders
                </button>
                <button
                  onClick={() => navigate(`/customers`)}
                  className="w-full p-3 text-left rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                  Browse Customers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
