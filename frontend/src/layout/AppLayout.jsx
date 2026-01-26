import { Outlet } from "react-router-dom";
import Navbar_Home from "../components/Navbar/Navbar_Home";
import { useState } from "react";
import CreateCustomerPopup from "../components/Customer/CreateCustomerPopup";

function AppLayout() {
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex flex-col items-center p-3">
      <Navbar_Home onNewCustomerClick={() => setShowCreateCustomer(true)} />

      {/* ✅ PROVIDE CONTEXT HERE */}
      <Outlet context={{ refreshKey }} />

      <CreateCustomerPopup
        isOpen={showCreateCustomer}
        onClose={() => setShowCreateCustomer(false)}
        onSuccess={() => {
          setShowCreateCustomer(false);
          setRefreshKey(prev => prev + 1);
        }}
      />
    </div>
  );
}

export default AppLayout;
