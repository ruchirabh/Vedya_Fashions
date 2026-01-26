// src/pages/CustomerPages/CreateCustomerPage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomerBasicDetails from "../../components/Customer/CustomerBasicDetails";
import CustomerMeasurements from "../../components/Customer/CustomerMeasurements";
import PageHeader from "../../components/Common/PageHeader";
import { use_CreateCustomer } from "../../hooks/Customer/use_CreateCustomer";
import { Ruler } from "lucide-react";


function CreateCustomerPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic"); // "basic" or "measurements"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "female",
  });

  // Blouse measurements
  const [blouseMeasurements, setBlouseMeasurements] = useState({
    liningType: "",
    sareeFall: "",
    zigzag: "",
    bust: "",
    waist: "",
    hip: "",
    sleeveLength: "",
    sleeveOpening: "",
    shoulderWidth: "",
    backWidth: "",
    frontNeckDepth: "",
    backNeckDepth: "",
  });

  // Bottom wear measurements
  const [bottomWearMeasurements, setBottomWearMeasurements] = useState({
    pantType: "",
    thigh: "",
    knee: "",
    ankle: "",
    length: "",
    rise: "",
    seat: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const { createCustomer, loading, error } = use_CreateCustomer();
  const fileInputRef = useRef(null);

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

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

      // Add measurements if provided
      if (blouseMeasurements.liningType || blouseMeasurements.bust) {
        fd.append("blouseMeasurements", JSON.stringify(blouseMeasurements));
        fd.append("measurementsTaken", "true");
      }

      if (bottomWearMeasurements.pantType || bottomWearMeasurements.thigh) {
        fd.append(
          "bottomWearMeasurements",
          JSON.stringify(bottomWearMeasurements),
        );
        fd.append("measurementsTaken", "true");
      }

      if (photoFile) fd.append("photo", photoFile);

      const data = await createCustomer(fd);

      if (data?.customer) {
        alert("Customer created successfully!");
        navigate(`/orders/place/${data.customer._id}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  // Utility functions
  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const captureFromCamera = () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";

      input.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
          resolve(e.target.files[0]);
        } else {
          reject(new Error("No image captured"));
        }
      };

      input.onerror = (e) => reject(new Error("Camera error"));
      input.click();
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <PageHeader
          title="Create New Customer"
          subtitle="Add customer details and measurements"
          onBack={() => navigate(-1)}
          backLabel="Back"
        />

        {/* Tabs */}
        <div className="flex border-b border-neutral-800 mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm sm:text-base ${activeTab === "basic" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-neutral-400 hover:text-neutral-300"}`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Details
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm sm:text-base flex items-center gap-2 ${activeTab === "measurements" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-neutral-400 hover:text-neutral-300"}`}
            onClick={() => setActiveTab("measurements")}
          >
            <Ruler size={16} />
            <span className="hidden sm:inline">Measurements</span>
            <span className="sm:hidden">Measure</span>
            <span className="text-xs px-1.5 py-0.5 bg-neutral-700 rounded ml-1">Optional</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === "basic" ? (
            <CustomerBasicDetails
              formData={formData}
              setFormData={setFormData}
              photoPreview={photoPreview}
              fileInputRef={fileInputRef}
              handleFileSelect={handleFileSelect}
              handleCameraCapture={handleCameraCapture}
              removePhoto={removePhoto}
              loading={loading}
              error={error}
              onNext={() => setActiveTab("measurements")}
            />
          ) : (
            <CustomerMeasurements
              blouseMeasurements={blouseMeasurements}
              setBlouseMeasurements={setBlouseMeasurements}
              bottomWearMeasurements={bottomWearMeasurements}
              setBottomWearMeasurements={setBottomWearMeasurements}
              loading={loading}
              onBack={() => setActiveTab("basic")}
              onSubmit={handleSubmit}
              formValid={formData.name.trim() && formData.phone.trim()}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateCustomerPage;