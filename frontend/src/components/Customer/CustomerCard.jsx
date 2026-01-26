// components/Customer/CustomerCard.jsx
import { User, Phone } from "lucide-react";

function CustomerCard({ customer, onClick, onSelect }) {
  // Handle the select action if onSelect is provided
  const handleSelect = (e) => {
    e.stopPropagation(); // Prevent triggering onClick when clicking the select button
    if (onSelect && typeof onSelect === 'function') {
      onSelect(customer);
    }
  };

  return (
    <div
      className="
        relative 
        w-full 
        max-w-[280px] 
        sm:max-w-sm
        mx-auto
        overflow-hidden 
        rounded-2xl 
        border border-neutral-800 
        bg-neutral-900 
        transition-all duration-300 
        hover:scale-[1.02] 
        hover:border-yellow-500 
        hover:shadow-2xl 
        hover:shadow-yellow-500/10
      "
      onClick={() => onClick && onClick(customer)}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-yellow-500/6 blur-[120px] animate-pulse" />
        <div
          className="absolute -bottom-10 -right-10 w-96 h-96 bg-orange-400/5 blur-[130px] animate-pulse"
          style={{ animationDelay: "6s" }}
        />
      </div>

      {/* CARD CONTENT */}
      <div className="relative flex flex-col">
        {/* IMAGE SECTION - Make it responsive */}
        <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
          {customer.photo ? (
            <img
              src={customer.photo}
              alt={customer.name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-neutral-800 flex items-center justify-center border border-neutral-700">
                <User className="w-10 h-10 sm:w-14 sm:h-14 text-neutral-400" />
              </div>
            </div>
          )}

          {/* Active Badge - Adjust positioning for small screens */}
          {customer.status === "active" && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-green-400 font-medium">
                Active
              </span>
            </div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {customer.name}
            </h3>

            <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Phone Number</p>
                <p className="text-sm sm:text-base text-white font-medium">
                  {customer.phone}
                </p>
              </div>
            </div>
          </div>

          {/* BUTTON - Only show if onSelect is provided */}
          {onSelect && (
            <button
              onClick={handleSelect}
              className="w-full mt-3 sm:mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 border border-yellow-500/30 rounded-xl text-sm sm:text-base text-yellow-400 font-medium transition-all hover:border-yellow-500/50 active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="truncate">Select Customer</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;