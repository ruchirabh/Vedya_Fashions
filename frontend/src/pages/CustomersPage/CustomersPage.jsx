// pages/CustomersPage/CustomersPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { use_GetCustomers } from "../../hooks/Customer/use_GetCustomers";
import CustomerGrid from "../../components/Customer/CustomerGrid";
import CustomerDetailsPopup from "../../components/Customer/CustomerDetailsPopup";

function CustomersPage() {
  const { customers, fetchCustomers } = use_GetCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="p-6">
      {/* 🔙 Back Button + Title */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        <h2 className="text-lg font-semibold text-yellow-400">
          All Customers
        </h2>
      </div>

      <CustomerGrid
        customers={customers}
        onCardClick={setSelectedCustomer}
      />

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

export default CustomersPage;