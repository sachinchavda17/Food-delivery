import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { deleteDataApi, putDataApi, getDataApi } from "../utils/api";
import { toast } from "react-hot-toast";
import { StoreContext } from "../utils/StoreContext";
import loadingSvg from "../assets/loading.svg";
import { getStatusColor } from "../utils/helpers";
const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [editOrderId, setEditOrderId] = useState(null);
  const [editData, setEditData] = useState({
    paymentStatus: "",
    orderStatus: "",
  });

  const { token } = useContext(StoreContext);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getDataApi("/api/orders/list-order", token);

        if (!response.success) {
          toast.error(response?.error || "Failed to get Orders.");
        } else {
          setOrders(response.orders);
        }
      } catch (error) {
        toast.error(error.message || "Failed to get Orders.");
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchOrders();
  }, [token]);

  const handleEdit = (order) => {
    setEditOrderId(order._id);
    setEditData({
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await putDataApi(
        "/api/orders/update-order",
        {
          orderId: id,
          paymentStatus: editData.paymentStatus,
          orderStatus: editData.orderStatus,
        },
        token
      );
      if (response.success) {
        toast.success(response.message || "Order Updated Successfully");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, ...editData } : order
          )
        );
      } else {
        toast.error(response.error || "Failed to update order");
      }
      setEditOrderId(null);
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error(error || "Failed to update order");
    }
  };

  const handleCancelEdit = () => {
    setEditOrderId(null);
    setEditData({ paymentStatus: "", orderStatus: "" });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteDataApi(`/api/orders/delete/${id}`, token);
      if (response.success) {
        toast.success(response.message || "Order Removed Successfully");
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
      } else {
        toast.error(response.error || "Failed to remove order");
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error(error.message || "Failed to remove order");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center flex-col items-center min-h-screen animate-pulse transition">
        <img src={loadingSvg} alt="Loading" />
        <span className="ml-2 text-lg">Loading Orders...</span>
      </div>
    );
  }

  return (
    <div className="order-manage p-6 w-full bg-background dark:bg-background-dark text-sm">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="w-full text-center bg-white dark:bg-secondary-dark rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-primary dark:bg-primary-dark text-white text-md">
            <th className="py-2 px-4">Order ID</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Total Amount</th>
            <th className="py-2 px-4">Payment Status</th>
            <th className="py-2 px-4">Order Status</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Last Update</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-secondary-dark/50"
            >
              <td className="py-2 px-4">{order._id}</td>
              <td className="py-2 px-4">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">&#8377;{order.totalPrice}</td>
              <td className="py-2 px-4">
                {editOrderId === order._id ? (
                  <select
                    value={editData.paymentStatus}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        paymentStatus: e.target.value,
                      })
                    }
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                ) : (
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>
                )}
              </td>
              <td className="py-2 px-4">
                {editOrderId === order._id ? (
                  <select
                    value={editData.orderStatus}
                    onChange={(e) =>
                      setEditData({ ...editData, orderStatus: e.target.value })
                    }
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                      order.orderStatus
                    )} `}
                  >
                    {order.orderStatus}
                  </span>
                )}
              </td>
              <td className="py-2 px-4">
                {order.deliveryAddress.street}, {order.deliveryAddress.city}
              </td>
              <td className="py-2 px-4">
                {new Date(order.updatedAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 flex space-x-3">
                {editOrderId === order._id ? (
                  <>
                    <button
                      className="text-green-500 "
                      onClick={() => handleSaveEdit(order._id)}
                    >
                      <FaSave />
                    </button>
                    <button
                      className="text-red-500 "
                      onClick={handleCancelEdit}
                    >
                      <FaTimes />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(order._id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-blue-500"
                      onClick={() => handleEdit(order)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(order._id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManage;
