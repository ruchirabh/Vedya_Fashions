import OrderCard from "./OrderCard";

function OrderGrid({ orders, onCardClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default OrderGrid;
