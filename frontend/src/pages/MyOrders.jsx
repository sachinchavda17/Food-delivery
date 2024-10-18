import React, { useContext, useEffect, useState } from "react";
import { getDataApi } from "../utils/api";
import loadingSvg from "../assets/loading.svg";
import { StoreContext } from "../utils/StoreContext";
import OrderDetailsModal from "../model/OrderDetailsModal";
import { getStatusColor, getStatusIcon } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

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
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
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
              <h3 className="text-lg box-border overflow-hidden font-semibold mb-2 dark:text-gray-200">
                Order ID: #{order._id}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Total: &#8377;{order.totalPrice.toFixed(2)}
              </p>

              <p className={`text-gray-500 dark:text-gray-400 mb-2 `}>
                Status:{" "}
                <span
                  className={`${getStatusColor(
                    order.orderStatus
                  )} inline-block px-2 py-1 text-xs font-semibold rounded`}
                >
                  {order.orderStatus}
                </span>
              </p>

              <button
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors duration-300 w-full"
                onClick={() => openOrderDetails(order)}
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
