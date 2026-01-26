// components/Customer/CustomerGrid.jsx
import CustomerCard from "./CustomerCard";

function CustomerGrid({ customers, onCardClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {customers.map((customer) => (
        <CustomerCard
          key={customer._id}
          customer={customer}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default CustomerGrid;