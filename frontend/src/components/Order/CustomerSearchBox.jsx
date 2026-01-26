// components/Order/CustomerSearchBox.jsx
import { useState } from "react";
import { use_SearchCustomers } from "../../hooks/Customer/use_SearchCustomers";
import CustomerCard from "../Customer/CustomerCard";

function CustomerSearchBox({ onCustomerSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResults, loading, searchCustomers } = use_SearchCustomers();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchCustomers(searchTerm);
    }
  };

  const handleSelectCustomer = (customer) => {
    if (onCustomerSelect && typeof onCustomerSelect === "function") {
      onCustomerSelect(customer);
      setSearchTerm("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers by name or phone..."
            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg focus:outline-none focus:border-yellow-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </div>

      {/* Search Results */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-neutral-400">Searching...</p>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {searchResults.map((customer) => (
            <div key={customer._id}>
              <CustomerCard 
                customer={customer} 
                onSelect={handleSelectCustomer}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && searchTerm && searchResults.length === 0 && (
        <div className="text-center py-4">
          <p className="text-neutral-400">No customers found</p>
        </div>
      )}
    </div>
  );
}

export default CustomerSearchBox;