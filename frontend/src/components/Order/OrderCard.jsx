import { Calendar, IndianRupee, User, Phone } from "lucide-react";

function OrderCard({ order, onClick }) {
  // Garment type background images or icons
  const getGarmentImage = (type) => {
    switch (type) {
      case "blouse":
        return (
          <div className="h-full w-full bg-gradient-to-br from-pink-900/20 to-pink-700/20 flex items-center justify-center">
            <div className="text-6xl sm:text-7xl opacity-50">👚</div>
          </div>
        );
      case "salwar":
        return (
          <div className="h-full w-full bg-gradient-to-br from-purple-900/20 to-purple-700/20 flex items-center justify-center">
            <div className="text-6xl sm:text-7xl opacity-50">👘</div>
          </div>
        );
      case "churidar":
        return (
          <div className="h-full w-full bg-gradient-to-br from-blue-900/20 to-blue-700/20 flex items-center justify-center">
            <div className="text-6xl sm:text-7xl opacity-50">👗</div>
          </div>
        );
      case "pant":
        return (
          <div className="h-full w-full bg-gradient-to-br from-green-900/20 to-green-700/20 flex items-center justify-center">
            <div className="text-6xl sm:text-7xl opacity-50">👖</div>
          </div>
        );
      default:
        return (
          <div className="h-full w-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
            <div className="text-6xl sm:text-7xl opacity-50">👕</div>
          </div>
        );
    }
  };

  // Garment type labels with colors
  const getGarmentLabel = (type) => {
    const labels = {
      blouse: {
        text: "Blouse",
        color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
      },
      salwar: {
        text: "Salwar",
        color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      },
      churidar: {
        text: "Churidar",
        color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      },
      pant: {
        text: "Pant",
        color: "text-green-400 border-green-500/30 bg-green-500/10",
      },
    };
    return (
      labels[type] || {
        text: type,
        color: "text-neutral-400 border-neutral-600 bg-neutral-700",
      }
    );
  };

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "finished":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "not_started":
      default:
        return "bg-neutral-700 text-neutral-400 border-neutral-600";
    }
  };

  const garmentLabel = getGarmentLabel(order.garmentType);
  const customerName = order.customerSnapshot?.name || "Unknown Customer";
  const customerPhoto = order.customerSnapshot?.photo;
  const statusText = order.status.replace("_", " ");
  const customerPhone = order.customerSnapshot?.phone;

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
      onClick={() => onClick && onClick(order)}
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
        {/* ENLARGED GARMENT IMAGE SECTION */}
        <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
          {getGarmentImage(order.garmentType)}

          {/* Garment Type Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span
              className={`text-xs px-3 py-1.5 rounded-full border ${garmentLabel.color} font-medium backdrop-blur-sm`}
            >
              {garmentLabel.text}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm">
            <span
              className={`text-xs font-medium ${getStatusColor(order.status)} px-2 py-0.5 rounded-full`}
            >
              {statusText}
            </span>
          </div>

          {/* Order Number */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <p className="text-yellow-400 font-mono text-sm font-semibold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg">
              #{order.orderNumber}
            </p>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Customer Info with Total Amount */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {customerPhoto ? (
                  <img
                    src={customerPhoto}
                    alt={customerName}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                    <User className="w-5 h-5 text-neutral-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {customerName}
                  </h3>
                  {customerPhone && (
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3 text-neutral-500" />
                      <p className="text-xs text-neutral-400">
                        {customerPhone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-sm text-neutral-400 mb-1">
                <IndianRupee size={14} />
                <span>Total</span>
              </div>
              <p className="text-xl font-bold text-white">
                ₹{order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Delivery Date and Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            {order.deliveryDate && (
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-neutral-500" />
                <div>
                  <p className="text-xs text-neutral-400">Delivery</p>
                  <p className="text-sm font-medium text-white">
                    {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}

            <button
              className="px-4 py-2 text-sm bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium transition-all hover:border-yellow-500/50 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick(order);
              }}
            >
              View Details
            </button>
          </div>

          {/* Notes (if any) */}
          {order.notes && (
            <div className="pt-3 border-t border-neutral-800">
              <p className="text-xs text-neutral-400 line-clamp-2">
                <span className="font-medium text-neutral-300">Note:</span>{" "}
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
