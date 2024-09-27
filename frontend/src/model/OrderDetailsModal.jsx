const OrderDetailsModal = ({ order, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
            Order Details
          </h2>
          <p className="dark:text-gray-300 mb-2">Order ID: {order._id}</p>
          <p className="dark:text-gray-300 mb-2">Total: ${order.totalPrice.toFixed(2)}</p>
          <p className="dark:text-gray-300 mb-2">Payment Method: {order.paymentMethod}</p>
          <p className="dark:text-gray-300 mb-2">Status: {order.orderStatus}</p>
          <p className="dark:text-gray-300 mb-2">
            Address: {order.deliveryAddress.street}, {order.deliveryAddress.city}
          </p>
          <button
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent w-full mt-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default OrderDetailsModal