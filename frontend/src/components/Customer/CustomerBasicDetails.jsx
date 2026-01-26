// src/components/Customer/CustomerBasicDetails.jsx
import { Upload, Camera, User, X, ArrowRight } from "lucide-react";
import React from "react";

function CustomerBasicDetails({
  formData,
  setFormData,
  photoPreview,
  fileInputRef,
  handleFileSelect,
  handleCameraCapture,
  removePhoto,
  loading,
  error,
  onNext,
}) {
  return (
    <div className="space-y-6">
      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      {/* Photo Section */}
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <div className="relative">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Customer preview"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-2 sm:border-4 border-neutral-700"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-neutral-800 flex items-center justify-center border-2 sm:border-4 border-neutral-700">
              <User className="text-neutral-500 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </div>
          )}
          {photoPreview && (
            <button
              type="button"
              onClick={removePhoto}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
              aria-label="Remove photo"
            >
              <X size={12} className="sm:w-3 sm:h-3" />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <label
            htmlFor="photo-upload"
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            disabled={loading}
          >
            <Upload size={14} className="sm:w-4 sm:h-4" />
            Upload Photo
          </label>
          <button
            type="button"
            onClick={handleCameraCapture}
            disabled={loading}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-neutral-700 rounded-md hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Camera size={14} className="sm:w-4 sm:h-4" />
            Camera
          </button>
        </div>
        <input
          ref={fileInputRef}
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={loading}
          className="hidden"
        />
      </div>

      {/* Basic Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-2">
          <label className="text-sm text-neutral-300">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            disabled={loading}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50 placeholder:text-neutral-500"
            placeholder="Enter customer name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-300">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            disabled={loading}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50 placeholder:text-neutral-500"
            placeholder="Enter phone number"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm text-neutral-300">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            disabled={loading}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50 placeholder:text-neutral-500"
            placeholder="Enter address (optional)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-300">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            disabled={loading}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-5 sm:pt-6 border-t border-neutral-800">
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.name.trim() || !formData.phone.trim() || loading}
          className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <span>Next: Add Measurements</span>
          <ArrowRight size={18} />
        </button>
        <p className="text-xs text-neutral-500 mt-3 text-center sm:text-left">
          * Required fields
        </p>
      </div>
    </div>
  );
}

export default CustomerBasicDetails;