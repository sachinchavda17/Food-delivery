import React, { useContext, useEffect, useState } from "react";
import { FaTruck, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"; // Importing icons
import { getDataApi } from "../utils/api"; // Assuming this is your API helper
import loadingSvg from "../assets/loading.svg"; // Loading icon
import { StoreContext } from "../utils/StoreContext";
import OrderDetailsModal from "../components/OrderDetailsModal";
import { getStatusIcon } from "../utils/helpers";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // Add state for selected order
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getDataApi("/api/orders/user-order", token);
        setOrders(response.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const openOrderDetails = (order) => {
    setSelectedOrder(order); // Set selected order for modal
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null); // Close modal
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">
        My Orders
      </h1>
      {loading ? (
        <div className="flex justify-center animate-pulse">
          <img src={loadingSvg} alt="Loading" className="w-16 h-16" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
          You have no orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 relative transition duration-300 shadow-lg hover:shadow-2xl dark:shadow-secondary dark:hover:shadow-secondary dark:shadow-lg dark:hover:shadow-2xl"
            >
              <div className="absolute top-4 right-4">
                {getStatusIcon(order.orderStatus)}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">
                Order ID: #{order._id}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Total: ${order.totalPrice.toFixed(2)}
              </p>

              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Status: {order.orderStatus}
              </p>

              <button
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors duration-300 w-full"
                onClick={() => openOrderDetails(order)} // Open modal on click
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for order details */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={closeOrderDetails}
        />
      )}
    </div>
  );
};

export default MyOrders;