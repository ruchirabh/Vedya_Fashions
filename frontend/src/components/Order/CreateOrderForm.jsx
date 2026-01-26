// components/Order/CreateOrderForm.jsx
import { useState, useEffect } from "react";
import { use_CreateOrderWithMeasurements } from "../../hooks/Orders/use_CreateOrderWithMeasurements";

function CreateOrderForm({ customer, onSuccess }) {
  const {
    form,
    loading,
    needsMeasurements,
    measurementData,
    updateField,
    updateMeasurement,
    checkMeasurements,
    createOrder,
    setNeedsMeasurements,
  } = use_CreateOrderWithMeasurements(customer._id, onSuccess);

  // Check measurements when garment type changes
  useEffect(() => {
    if (form.garmentType) {
      checkMeasurements();
    }
  }, [form.garmentType]);

  // Render blouse measurements form
  const renderBlouseMeasurements = () => (
    <div className="space-y-4 p-4 border border-neutral-700 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Blouse Measurements</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Lining Type"
          value={measurementData.liningType || ""}
          onChange={(e) => updateMeasurement("liningType", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Saree Fall (cm)"
          value={measurementData.sareeFall || ""}
          onChange={(e) => updateMeasurement("sareeFall", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Zigzag (cm)"
          value={measurementData.zigzag || ""}
          onChange={(e) => updateMeasurement("zigzag", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Bust (cm)"
          value={measurementData.bust || ""}
          onChange={(e) => updateMeasurement("bust", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Waist (cm)"
          value={measurementData.waist || ""}
          onChange={(e) => updateMeasurement("waist", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Hip (cm)"
          value={measurementData.hip || ""}
          onChange={(e) => updateMeasurement("hip", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Sleeve Length (cm)"
          value={measurementData.sleeveLength || ""}
          onChange={(e) => updateMeasurement("sleeveLength", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Sleeve Opening (cm)"
          value={measurementData.sleeveOpening || ""}
          onChange={(e) => updateMeasurement("sleeveOpening", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Shoulder Width (cm)"
          value={measurementData.shoulderWidth || ""}
          onChange={(e) => updateMeasurement("shoulderWidth", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Back Width (cm)"
          value={measurementData.backWidth || ""}
          onChange={(e) => updateMeasurement("backWidth", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Front Neck Depth (cm)"
          value={measurementData.frontNeckDepth || ""}
          onChange={(e) => updateMeasurement("frontNeckDepth", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Back Neck Depth (cm)"
          value={measurementData.backNeckDepth || ""}
          onChange={(e) => updateMeasurement("backNeckDepth", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
      </div>
    </div>
  );

  // Render bottom wear measurements form
  const renderBottomWearMeasurements = () => (
    <div className="space-y-4 p-4 border border-neutral-700 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Bottom Wear Measurements</h3>
      <div className="grid grid-cols-2 gap-4">
        <select
          value={measurementData.pantType || ""}
          onChange={(e) => updateMeasurement("pantType", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        >
          <option value="">Select Pant Type</option>
          <option value="salwar">Salwar</option>
          <option value="churidar">Churidar</option>
          <option value="pant">Pant</option>
        </select>
        <input
          type="number"
          placeholder="Thigh (cm)"
          value={measurementData.thigh || ""}
          onChange={(e) => updateMeasurement("thigh", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Knee (cm)"
          value={measurementData.knee || ""}
          onChange={(e) => updateMeasurement("knee", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Ankle (cm)"
          value={measurementData.ankle || ""}
          onChange={(e) => updateMeasurement("ankle", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Length (cm)"
          value={measurementData.length || ""}
          onChange={(e) => updateMeasurement("length", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Rise (cm)"
          value={measurementData.rise || ""}
          onChange={(e) => updateMeasurement("rise", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
        <input
          type="number"
          placeholder="Seat (cm)"
          value={measurementData.seat || ""}
          onChange={(e) => updateMeasurement("seat", e.target.value)}
          className="px-3 py-2 bg-neutral-950 border border-neutral-700 rounded"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Order Details */}
      <div className="space-y-4">
        <select
          value={form.garmentType}
          onChange={(e) => updateField("garmentType", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
        >
          <option value="">Select Garment Type</option>
          <option value="blouse">Blouse</option>
          <option value="salwar">Salwar</option>
          <option value="churidar">Churidar</option>
          <option value="pant">Pant</option>
        </select>

        <input
          type="number"
          placeholder="Total Amount"
          value={form.totalAmount}
          onChange={(e) => updateField("totalAmount", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
        />

        <input
          type="number"
          placeholder="Advance Amount"
          value={form.advanceAmount}
          onChange={(e) => updateField("advanceAmount", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
        />

        <input
          type="date"
          value={form.deliveryDate}
          onChange={(e) => updateField("deliveryDate", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
        />

        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
          rows={3}
        />
      </div>

      {/* Measurements Section */}
      {needsMeasurements && form.garmentType && (
        <div className="border-t border-neutral-800 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-yellow-400">
              {form.garmentType === "blouse" ? "Blouse Measurements Required" : "Bottom Wear Measurements Required"}
            </h3>
            <button
              onClick={() => setNeedsMeasurements(false)}
              className="px-3 py-1 text-sm border border-neutral-700 rounded hover:bg-neutral-800"
            >
              Skip (Use Existing)
            </button>
          </div>
          
          {form.garmentType === "blouse" 
            ? renderBlouseMeasurements()
            : renderBottomWearMeasurements()
          }
        </div>
      )}

      <button
        onClick={createOrder}
        disabled={loading}
        className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Order..." : "Create Order"}
      </button>
    </div>
  );
}

export default CreateOrderForm;