// src/components/Customer/CustomerMeasurements.jsx
import { ArrowLeft, Save, Ruler } from "lucide-react";
import React, { useState } from "react";

function CustomerMeasurements({
  blouseMeasurements,
  setBlouseMeasurements,
  bottomWearMeasurements,
  setBottomWearMeasurements,
  loading,
  onBack,
  onSubmit,
  formValid,
}) {
  const [activeMeasurementTab, setActiveMeasurementTab] = useState("blouse"); // "blouse" or "bottom"

  const measurementFields = {
    blouse: [
      { key: "liningType", label: "Lining Type", type: "select", options: ["", "cotton", "silk", "net", "satin"] },
      { key: "sareeFall", label: "Saree Fall", unit: "cm", type: "number" },
      { key: "zigzag", label: "Zigzag", unit: "cm", type: "number" },
      { key: "bust", label: "Bust", unit: "cm", type: "number" },
      { key: "waist", label: "Waist", unit: "cm", type: "number" },
      { key: "hip", label: "Hip", unit: "cm", type: "number" },
      { key: "sleeveLength", label: "Sleeve Length", unit: "cm", type: "number" },
      { key: "sleeveOpening", label: "Sleeve Opening", unit: "cm", type: "number" },
      { key: "shoulderWidth", label: "Shoulder Width", unit: "cm", type: "number" },
      { key: "backWidth", label: "Back Width", unit: "cm", type: "number" },
      { key: "frontNeckDepth", label: "Front Neck Depth", unit: "cm", type: "number" },
      { key: "backNeckDepth", label: "Back Neck Depth", unit: "cm", type: "number" },
    ],
    bottom: [
      { key: "pantType", label: "Pant Type", type: "select", options: ["", "salwar", "churidar", "pant"] },
      { key: "thigh", label: "Thigh", unit: "cm", type: "number" },
      { key: "knee", label: "Knee", unit: "cm", type: "number" },
      { key: "ankle", label: "Ankle", unit: "cm", type: "number" },
      { key: "length", label: "Length", unit: "cm", type: "number" },
      { key: "rise", label: "Rise", unit: "cm", type: "number" },
      { key: "seat", label: "Seat", unit: "cm", type: "number" },
    ],
  };

  const renderField = (field, measurements, setMeasurements, isBlouse = true) => {
    const value = measurements[field.key] || "";

    if (field.type === "select") {
      return (
        <div className="space-y-2">
          <label className="text-sm text-neutral-300">{field.label}</label>
          <select
            value={value}
            onChange={(e) =>
              isBlouse
                ? setBlouseMeasurements({ ...blouseMeasurements, [field.key]: e.target.value })
                : setBottomWearMeasurements({ ...bottomWearMeasurements, [field.key]: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none"
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option === "" ? "Select" : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="text-sm text-neutral-300">
          {field.label} {field.unit && <span className="text-neutral-500">({field.unit})</span>}
        </label>
        <input
          type={field.type}
          value={value}
          onChange={(e) =>
            isBlouse
              ? setBlouseMeasurements({ ...blouseMeasurements, [field.key]: e.target.value })
              : setBottomWearMeasurements({ ...bottomWearMeasurements, [field.key]: e.target.value })
          }
          className="w-full px-3 sm:px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none placeholder:text-neutral-500"
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Measurement Type Tabs */}
      <div className="flex border-b border-neutral-800">
        <button
          className={`px-4 py-3 font-medium text-sm sm:text-base flex-1 flex items-center justify-center gap-2 ${activeMeasurementTab === "blouse" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-neutral-400 hover:text-neutral-300"}`}
          onClick={() => setActiveMeasurementTab("blouse")}
        >
          <Ruler size={16} />
          <span>Blouse</span>
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm sm:text-base flex-1 flex items-center justify-center gap-2 ${activeMeasurementTab === "bottom" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-neutral-400 hover:text-neutral-300"}`}
          onClick={() => setActiveMeasurementTab("bottom")}
        >
          <Ruler size={16} />
          <span>Bottom Wear</span>
        </button>
      </div>

      {/* Measurements Form */}
      <div className="bg-neutral-950/50 border border-neutral-800 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4 sm:mb-6">
          {activeMeasurementTab === "blouse" ? "Blouse Measurements" : "Bottom Wear Measurements"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {measurementFields[activeMeasurementTab === "blouse" ? "blouse" : "bottom"].map((field) =>
            renderField(
              field,
              activeMeasurementTab === "blouse" ? blouseMeasurements : bottomWearMeasurements,
              activeMeasurementTab === "blouse" ? setBlouseMeasurements : setBottomWearMeasurements,
              activeMeasurementTab === "blouse",
            ),
          )}
        </div>

        <div className="mt-6 pt-5 border-t border-neutral-800">
          <p className="text-sm text-neutral-400">
            <span className="text-yellow-400">Note:</span> Measurements are optional. You can add them now or later when creating an order.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-5 border-t border-neutral-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 sm:px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
        >
          <ArrowLeft size={18} />
          <span>Back to Basic Details</span>
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          disabled={loading || !formValid}
          className="px-5 sm:px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⟳</span>
              <span>Creating...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Create Customer & Continue to Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CustomerMeasurements;