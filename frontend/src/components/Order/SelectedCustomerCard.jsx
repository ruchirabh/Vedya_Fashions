import { Phone } from "lucide-react";

function SelectedCustomerCard({ customer, onChange }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
      <img
        src={customer.photo || "/avatar.png"}
        alt={customer.name}
        className="w-14 h-14 rounded-full object-cover"
      />

      <div className="flex-1">
        <h3 className="text-white font-semibold">{customer.name}</h3>
        <p className="text-sm text-neutral-400 flex items-center gap-2">
          <Phone size={14} /> {customer.phone}
        </p>
      </div>

      <button
        onClick={onChange}
        className="px-3 py-1.5 text-sm border border-neutral-700 rounded-md hover:bg-neutral-800"
      >
        Change
      </button>
    </div>
  );
}

export default SelectedCustomerCard;
