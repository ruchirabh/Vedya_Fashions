import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, User, UserPlus, Phone, MapPin } from "lucide-react";
import { use_SearchCustomers } from "../../hooks/Customer/use_SearchCustomers";
import CreateCustomerPopup from "../../components/Customer/CreateCustomerPopup";

function CreateOrderPage() {
  const navigate = useNavigate();
  const {
    searchResults,
    loading: searchLoading,
    searchCustomers,
  } = use_SearchCustomers();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchCustomers(searchTerm);
    }
  };

  const handleSelectCustomer = (customer) => {
    navigate(`/orders/place/${customer._id}`);
  };

  const handleNewCustomerCreated = (customer) => {
    setShowCreateCustomer(false);
    navigate(`/orders/place/${customer._id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
                Create New Order
              </h1>
              <p className="text-neutral-400 mt-2 max-w-2xl">
                Search for an existing customer or create a new one to start a
                new order
              </p>
            </div>
            <button
              onClick={() => setShowCreateCustomer(true)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-yellow-500/20"
            >
              <UserPlus className="w-5 h-5" />
              <span className="text-lg">New Customer</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Search */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Search className="w-6 h-6 text-yellow-400" />
                  </div>
                  Search Existing Customers
                </h2>
                <p className="text-neutral-400">
                  Find customers by name, phone number, or address
                </p>
              </div>

              {/* Enhanced Search Bar */}
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Search by name, phone, or address..."
                      className="w-full px-6 py-4 pl-12 bg-neutral-900 border border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg transition-all"
                    />
                    <Search className="absolute left-4 top-4 w-6 h-6 text-neutral-500" />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={searchLoading || !searchTerm.trim()}
                    className="px-8 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {searchLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Searching
                      </div>
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>

                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-neutral-500">
                    Try searching:
                  </span>
                  <button
                    onClick={() => setSearchTerm("Female")}
                    className="text-sm px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Female
                  </button>
                  <button
                    onClick={() => setSearchTerm("Blouse")}
                    className="text-sm px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Blouse Orders
                  </button>
                  <button
                    onClick={() => setSearchTerm("Recent")}
                    className="text-sm px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Recent
                  </button>
                </div>
              </div>

              {/* Search Results */}
              {searchLoading && (
                <div className="mt-8 text-center py-12">
                  <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-neutral-400 text-lg">
                    Searching database...
                  </p>
                  <p className="text-sm text-neutral-500 mt-2">
                    Looking for customers matching your search
                  </p>
                </div>
              )}

              {!searchLoading && searchResults.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-semibold text-white">
                      Found {searchResults.length} customer
                      {searchResults.length !== 1 ? "s" : ""}
                    </p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-sm text-neutral-400 hover:text-white"
                    >
                      Clear search
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                    {searchResults.map((customer) => (
                      <div
                        key={customer._id}
                        onClick={() => handleSelectCustomer(customer)}
                        className="group bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-yellow-500 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-xl bg-neutral-800 flex items-center justify-center overflow-hidden border border-neutral-700 group-hover:border-yellow-500 transition-colors">
                              {customer.photo ? (
                                <img
                                  src={customer.photo}
                                  alt={customer.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-8 h-8 text-neutral-400" />
                              )}
                            </div>
                            {customer.status === "active" && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900"></div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors truncate">
                              {customer.name}
                            </h3>
                            <div className="space-y-2 mt-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-neutral-500" />
                                <span className="text-neutral-300">
                                  {customer.phone}
                                </span>
                              </div>
                              {customer.address && (
                                <div className="flex items-start gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-neutral-400 line-clamp-2">
                                    {customer.address}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {customer.blouseMeasurements && (
                                <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-400 rounded">
                                  Blouse Measured
                                </span>
                              )}
                              {customer.bottomWearMeasurements && (
                                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                                  Bottom Measured
                                </span>
                              )}

                              <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-1.5 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium">
                                Select →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!searchLoading && searchTerm && searchResults.length === 0 && (
                <div className="mt-8 text-center py-12 rounded-2xl bg-neutral-900/50 border border-neutral-700">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center border border-neutral-700">
                    <Search className="w-10 h-10 text-neutral-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    No customers found for "{searchTerm}"
                  </h3>
                  <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                    We couldn't find any customers matching your search. Try a
                    different search term or create a new customer.
                  </p>
                  <button
                    onClick={() => setShowCreateCustomer(true)}
                    className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold rounded-xl text-lg transition-all hover:scale-[1.02]"
                  >
                    <UserPlus className="w-5 h-5" />
                    Create New Customer
                  </button>
                </div>
              )}

              {!searchLoading && !searchTerm && searchResults.length === 0 && (
                <div className="mt-8 text-center py-16 rounded-2xl bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 border border-neutral-700">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 flex items-center justify-center border border-yellow-500/20">
                    <Search className="w-12 h-12 text-yellow-500/50" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Start Your Search
                  </h3>
                  <p className="text-neutral-400 mb-6 max-w-lg mx-auto text-lg">
                    Enter a customer's name, phone number, or address to find
                    existing customers and create their orders
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 rounded-xl">
                    <Search className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-400">
                      Type to begin searching...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Help/Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Stats */}
              <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowCreateCustomer(true)}
                    className="w-full p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 border border-yellow-500/30 rounded-xl text-left group transition-all hover:border-yellow-500/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <UserPlus className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-yellow-400">
                          New Customer
                        </p>
                        <p className="text-sm text-neutral-400">
                          Register a new customer
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate("/customers")}
                    className="w-full p-4 bg-neutral-900/50 hover:bg-neutral-800/50 border border-neutral-700 rounded-xl text-left group transition-all hover:border-neutral-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <User className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          All Customers
                        </p>
                        <p className="text-sm text-neutral-400">
                          View customer database
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate("/orders/all")}
                    className="w-full p-4 bg-neutral-900/50 hover:bg-neutral-800/50 border border-neutral-700 rounded-xl text-left group transition-all hover:border-neutral-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <span className="text-green-400 text-lg">📦</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">All Orders</p>
                        <p className="text-sm text-neutral-400">
                          View order history
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs">1</span>
                    </div>
                    <span className="text-neutral-300">
                      Use phone number for fastest search
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs">2</span>
                    </div>
                    <span className="text-neutral-300">
                      Check customer measurements before ordering
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs">3</span>
                    </div>
                    <span className="text-neutral-300">
                      Add measurements for new customers
                    </span>
                  </li>
                </ul>
              </div>

              {/* Recent Activity (Optional) */}
              <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Recent Orders
                </h3>
                <p className="text-neutral-400 text-sm">
                  Create orders for customers who have recently visited or have
                  pending work
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Customer Popup */}
      <CreateCustomerPopup
        isOpen={showCreateCustomer}
        onClose={() => setShowCreateCustomer(false)}
        onSuccess={handleNewCustomerCreated}
      />
    </div>
  );
}

export default CreateOrderPage;
