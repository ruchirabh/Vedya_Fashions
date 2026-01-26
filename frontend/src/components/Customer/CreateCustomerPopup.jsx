import React, { useState, useRef } from "react";
import { X, Upload, Camera, User } from "lucide-react";
import { use_CreateCustomer } from "../../hooks/Customer/use_CreateCustomer";

// Utility functions
const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Simple camera capture using file input
const captureFromCamera = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; // Opens camera on mobile

    input.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        resolve(e.target.files[0]);
      } else {
        reject(new Error("No image captured"));
      }
    };

    input.onerror = (e) => reject(new Error("Camera error"));

    // Trigger click on mobile, use file dialog on desktop
    input.click();
  });
};

function CreateCustomerPopup({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "male", // default value
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const { createCustomer, loading, error } = use_CreateCustomer();
  const fileInputRef = useRef(null);

  // Reset form when closing
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", phone: "", address: "", gender: "male" });
      setPhotoFile(null);
      setPhotoPreview("");
    }
  }, [isOpen]);

  // Handle file selection
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setPhotoFile(file);

    try {
      const base64 = await imageToBase64(file);
      setPhotoPreview(base64);
    } catch (err) {
      alert("Failed to process image");
      console.error(err);
    }
  };

  // Handle camera capture
  const handleCameraCapture = async () => {
    try {
      const file = await captureFromCamera();

      if (!file.type.startsWith("image/")) {
        alert("Please capture an image");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size too large");
        return;
      }

      setPhotoFile(file);
      const base64 = await imageToBase64(file);
      setPhotoPreview(base64);
    } catch (err) {
      console.error("Camera capture error:", err);
      alert("Failed to capture image: " + err.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return alert("Please enter customer name");
    if (!formData.phone.trim()) return alert("Please enter phone number");

    try {
      const fd = new FormData();
      fd.append("name", formData.name.trim());
      fd.append("phone", formData.phone.trim());
      fd.append("address", formData.address.trim());
      fd.append("gender", formData.gender);

      if (photoFile) fd.append("photo", photoFile);

      const data = await createCustomer(fd);

      if (data?.customer) {
        onSuccess(data.customer);
        onClose();
      } else {
        alert("Customer created but no data returned");
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  // Remove photo
  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h2 className="text-lg font-semibold text-yellow-400">
            New Customer
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-neutral-400 hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {/* Photo */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Customer preview"
                  className="w-28 h-28 rounded-full object-cover border border-neutral-700"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-neutral-800 flex items-center justify-center">
                  <User className="text-neutral-500" size={36} />
                </div>
              )}
              {photoPreview && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <label
                htmlFor="photo-upload"
                className="px-3 py-1.5 text-sm border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Upload
              </label>
              <button
                type="button"
                onClick={handleCameraCapture}
                disabled={loading}
                className="px-3 py-1.5 text-sm border border-neutral-700 rounded-md hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
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

          {/* Name */}
          <div>
            <label className="text-sm text-neutral-300">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={loading}
              required
              className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50"
              placeholder="Enter customer name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-neutral-300">Phone Number *</label>
            <input
              type="number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={loading}
              required
              className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50"
              placeholder="Enter phone number"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-neutral-300">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              disabled={loading}
              className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50"
              placeholder="Enter address"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-neutral-300">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              disabled={loading}
              className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 focus:border-yellow-500 outline-none disabled:opacity-50"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2 border border-neutral-700 rounded-md hover:bg-neutral-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                loading || !formData.name.trim() || !formData.phone.trim()
              }
              className="flex-1 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCustomerPopup;
