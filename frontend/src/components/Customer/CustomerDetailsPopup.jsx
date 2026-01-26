import { useEffect, useState, useRef } from "react";
import { X, Trash2, Save, Loader2, Camera, Upload, User } from "lucide-react";
import { use_GetCustomerById } from "../../hooks/Customer/use_GetCustomerById";
import { use_UpdateCustomer } from "../../hooks/Customer/use_UpdateCustomer";
import { use_DeleteCustomer } from "../../hooks/Customer/use_DeleteCustomer";

/* ---------------- UTILS ---------------- */

const imageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

/* ---------------- COMPONENT ---------------- */

function CustomerDetailsPopup({ customer, onClose, onUpdated }) {
  const {
    customer: freshCustomer,
    fetchCustomer,
    loading,
  } = use_GetCustomerById();
  const { updateCustomer, loading: updating } = use_UpdateCustomer();
  const { deleteCustomer, loading: deleting } = use_DeleteCustomer();
  const [lastOrder, setLastOrder] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const fileInputRef = useRef(null);

  /* ---------------- FETCH CUSTOMER ---------------- */

  useEffect(() => {
    fetchCustomer(customer._id);
  }, [customer._id, fetchCustomer]);

  useEffect(() => {
    if (freshCustomer) {
      setForm({
        name: freshCustomer.name || "",
        phone: freshCustomer.phone || "",
        address: freshCustomer.address || "",
        gender: freshCustomer.gender || "",
      });
      setPhotoPreview(freshCustomer.photo || "");
    }
  }, [freshCustomer]);

  /* ---------------- PHOTO HANDLERS ---------------- */

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Select a valid image");
      return;
    }

    setPhotoFile(file);
    const base64 = await imageToBase64(file);
    setPhotoPreview(base64);
  };

  /* ---------------- ACTIONS ---------------- */

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    formData.append("gender", form.gender);

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    await updateCustomer(customer._id, formData);
    onUpdated();
    onClose();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this customer permanently?")) return;
    await deleteCustomer(customer._id);
    onUpdated();
    onClose();
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl max-h-[95vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 border-b border-neutral-800 sticky top-0 bg-neutral-900">
          <h2 className="text-lg font-semibold text-yellow-400">
            Customer Details
          </h2>
          <button onClick={onClose}>
            <X className="text-neutral-400 hover:text-white w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* PHOTO */}
          <div className="flex flex-col items-center gap-3">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Customer"
                className="w-28 h-28 rounded-full object-cover border border-neutral-700"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-neutral-800 flex items-center justify-center">
                <User className="text-neutral-500" size={32} />
              </div>
            )}

            <div className="flex gap-2">
              <label
                htmlFor="photo-upload"
                className="px-3 py-1.5 text-sm border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-800"
              >
                <Upload size={14} className="inline mr-1" />
                Upload
              </label>

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-1.5 text-sm border border-neutral-700 rounded-md hover:bg-neutral-800"
              >
                <Camera size={14} className="inline mr-1" />
                Change
              </button>
            </div>

            <input
              ref={fileInputRef}
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* FORM */}
          <div className="space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
              placeholder="Customer Name"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
              placeholder="Phone Number"
            />

            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
              placeholder="Address"
            />

            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg">
            <p className="text-xs text-neutral-400 mb-1">Last Order</p>

            {lastOrder ? (
              <p className="text-sm text-neutral-200">
                Last ordered on{" "}
                <span className="text-yellow-400 font-medium">
                  {new Date(lastOrder).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
            ) : (
              <p className="text-sm text-neutral-500 italic">No order yet</p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 p-4 border-t border-neutral-800 sticky bottom-0 bg-neutral-900">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 py-3 border border-red-800 text-red-400 rounded-lg hover:bg-red-900/20"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

          <button
            onClick={handleUpdate}
            disabled={updating}
            className="flex-1 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsPopup;
