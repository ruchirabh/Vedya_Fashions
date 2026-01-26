// src/pages/OrdersPage/PlaceOrderPage.jsx - UPDATED
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Phone, MapPin, Ruler, AlertCircle } from "lucide-react";
import { use_GetCustomerById } from "../../hooks/Customer/use_GetCustomerById";
import { use_CreateOrderWithMeasurements } from "../../hooks/Orders/use_CreateOrderWithMeasurements";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { customer, fetchCustomer, loading } = use_GetCustomerById();
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [needsMeasurements, setNeedsMeasurements] = useState(false);

  useEffect(() => {
    if (customerId) {
      fetchCustomer(customerId);
    }
  }, [customerId, fetchCustomer]);

  useEffect(() => {
    if (customer) {
      // Check if customer has measurements
      const hasMeasurements = customer.measurementsTaken || 
        (customer.blouseMeasurements && Object.keys(customer.blouseMeasurements).length > 0) ||
        (customer.bottomWearMeasurements && Object.keys(customer.bottomWearMeasurements).length > 0);
      
      setNeedsMeasurements(!hasMeasurements);
    }
  }, [customer]);

  const {
    form,
    loading: orderLoading,
    needsMeasurements: orderNeedsMeasurements,
    measurementData,
    updateField,
    updateMeasurement,
    checkMeasurements,
    createOrder,
    setNeedsMeasurements: setOrderNeedsMeasurements,
  } = use_CreateOrderWithMeasurements(customerId, () => {
    alert("Order created successfully!");
    navigate("/home");
  });

  const handleOrderSuccess = () => {
    alert("Order created successfully!");
    navigate("/home");
  };

  const renderMeasurementsForm = () => {
    if (form.garmentType === "blouse") {
      return (
        <div className="space-y-6 bg-neutral-950 p-6 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-yellow-400">Blouse Measurements</h3>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <AlertCircle size={16} />
              <span>Required for new customers</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-neutral-300">Lining Type</label>
              <select
                value={measurementData.liningType || ""}
                onChange={(e) => updateMeasurement("liningType", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
              >
                <option value="">Select</option>
                <option value="cotton">Cotton</option>
                <option value="silk">Silk</option>
                <option value="net">Net</option>
                <option value="satin">Satin</option>
              </select>
            </div>
            
            {["sareeFall", "zigzag", "bust", "waist", "hip", "sleeveLength", 
              "sleeveOpening", "shoulderWidth", "backWidth", "frontNeckDepth", 
              "backNeckDepth"].map((field) => (
              <div key={field}>
                <label className="text-sm text-neutral-300">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} (cm)
                </label>
                <input
                  type="number"
                  placeholder="cm"
                  value={measurementData[field] || ""}
                  onChange={(e) => updateMeasurement(field, e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6 bg-neutral-950 p-6 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-yellow-400">Bottom Wear Measurements</h3>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <AlertCircle size={16} />
              <span>Required for new customers</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-neutral-300">Pant Type</label>
              <select
                value={measurementData.pantType || ""}
                onChange={(e) => updateMeasurement("pantType", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
              >
                <option value="">Select</option>
                <option value="salwar">Salwar</option>
                <option value="churidar">Churidar</option>
                <option value="pant">Pant</option>
              </select>
            </div>
            
            {["thigh", "knee", "ankle", "length", "rise", "seat"].map((field) => (
              <div key={field}>
                <label className="text-sm text-neutral-300">
                  {field.charAt(0).toUpperCase() + field.slice(1)} (cm)
                </label>
                <input
                  type="number"
                  placeholder="cm"
                  value={measurementData[field] || ""}
                  onChange={(e) => updateMeasurement(field, e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const renderExistingMeasurements = () => {
    if (!customer) return null;
    
    if (form.garmentType === "blouse" && customer.blouseMeasurements) {
      return (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-green-400 flex items-center gap-2">
              <Ruler size={16} />
              Existing Blouse Measurements
            </h4>
            <button
              type="button"
              onClick={() => {
                setShowMeasurements(true);
                setOrderNeedsMeasurements(true);
              }}
              className="text-sm px-3 py-1 border border-neutral-700 rounded hover:bg-neutral-800"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(customer.blouseMeasurements).map(([key, value]) => (
              value && (
                <div key={key} className="text-sm">
                  <span className="text-neutral-400">{key.replace(/([A-Z])/g, ' $1')}: </span>
                  <span className="text-white">{value}</span>
                </div>
              )
            ))}
          </div>
        </div>
      );
    } else if (form.garmentType !== "blouse" && customer.bottomWearMeasurements) {
      return (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-green-400 flex items-center gap-2">
              <Ruler size={16} />
              Existing Bottom Wear Measurements
            </h4>
            <button
              type="button"
              onClick={() => {
                setShowMeasurements(true);
                setOrderNeedsMeasurements(true);
              }}
              className="text-sm px-3 py-1 border border-neutral-700 rounded hover:bg-neutral-800"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(customer.bottomWearMeasurements).map(([key, value]) => (
              value && (
                <div key={key} className="text-sm">
                  <span className="text-neutral-400">{key}: </span>
                  <span className="text-white">{value}</span>
                </div>
              )
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Customer not found</p>
          <button
            onClick={() => navigate("/orders/create")}
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/orders/create")}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Create Order</h1>
            <p className="text-neutral-400 mt-1">Place a new order for this customer</p>
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">Customer Details</h2>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {customer.photo ? (
                <img src={customer.photo} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-neutral-400" />
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{customer.name}</h3>
                  <div className="flex items-center gap-2 text-neutral-300 mt-1">
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                </div>
                
                {needsMeasurements && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={14} />
                      <span>Measurements needed</span>
                    </div>
                  </div>
                )}
              </div>
              
              {customer.address && (
                <div className="flex items-start gap-2 text-neutral-300">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{customer.address}</span>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-neutral-700">
                <div>
                  <p className="text-sm text-neutral-400">Measurement Status</p>
                  <p className={`text-lg font-semibold ${customer.measurementsTaken ? 'text-green-400' : 'text-red-400'}`}>
                    {customer.measurementsTaken ? 'Available' : 'Not Taken'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Last Measured</p>
                  <p className="text-lg font-semibold text-white">
                    {customer.measurementDate 
                      ? new Date(customer.measurementDate).toLocaleDateString()
                      : 'Never'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Order Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-neutral-300">Garment Type *</label>
              <select
                value={form.garmentType || ""}
                onChange={async (e) => {
                  updateField("garmentType", e.target.value);
                  if (e.target.value) {
                    const needs = await checkMeasurements();
                    if (needs && !customer.measurementsTaken) {
                      setShowMeasurements(true);
                    }
                  }
                }}
                className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
                required
              >
                <option value="">Select Garment Type</option>
                <option value="blouse">Blouse</option>
                <option value="salwar">Salwar</option>
                <option value="churidar">Churidar</option>
                <option value="pant">Pant</option>
              </select>
            </div>

            {form.garmentType && (
              <>
                {!showMeasurements && renderExistingMeasurements()}
                
                {showMeasurements && renderMeasurementsForm()}
                
                {!showMeasurements && needsMeasurements && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-yellow-400" size={20} />
                      <div>
                        <p className="text-yellow-400 font-medium">Measurements Required</p>
                        <p className="text-sm text-neutral-300">
                          This customer doesn't have {form.garmentType} measurements. 
                          Please add them before creating the order.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowMeasurements(true)}
                      className="mt-3 px-4 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400"
                    >
                      Add Measurements
                    </button>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-neutral-300">Total Amount (₹) *</label>
                    <input
                      type="number"
                      value={form.totalAmount || ""}
                      onChange={(e) => updateField("totalAmount", e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-neutral-300">Advance Amount (₹)</label>
                    <input
                      type="number"
                      value={form.advanceAmount || ""}
                      onChange={(e) => updateField("advanceAmount", e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
                      placeholder="Enter advance"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-neutral-300">Delivery Date</label>
                    <input
                      type="date"
                      value={form.deliveryDate || ""}
                      onChange={(e) => updateField("deliveryDate", e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-neutral-300">Notes</label>
                  <textarea
                    value={form.notes || ""}
                    onChange={(e) => updateField("notes", e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
                    rows={3}
                    placeholder="Add any special instructions..."
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="pt-4 border-t border-neutral-700">
            <button
              onClick={createOrder}
              disabled={orderLoading || !form.garmentType || !form.totalAmount}
              className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {orderLoading ? "Creating Order..." : "Create Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;