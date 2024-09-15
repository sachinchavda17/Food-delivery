import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { getDataApi } from "../../../frontend/src/utils/api";
import { deleteDataApi, putDataApi } from "../utils/api";
import {toast} from "react-hot-toast"
const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editData, setEditData] = useState({
    paymentStatus: "",
    orderStatus: "",
  });

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getDataApi("/api/orders/list-order");
        
        if(!response.success){
            toast.error(response?.error || "Failed to get Orders.")
        }
        setOrders(response.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setEditOrderId(order._id);
    setEditData({
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await putDataApi("/api/orders/update-order", {
        orderId: id,
        paymentStatus: editData.paymentStatus,
        orderStatus: editData.orderStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, ...editData } : order
        )
      );
      setEditOrderId(null);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditOrderId(null);
    setEditData({ paymentStatus: "", orderStatus: "" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDataApi(`/api/orders/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

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
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
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
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : order.orderStatus === "Out for Delivery"
                        ? "bg-blue-200 text-blue-700"
                        : order.orderStatus === "Delivered"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
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
              <td className="py-2 px-4 space-x-2">
                {editOrderId === order._id && (
                  <>
                    <button
                      className="text-green-500 mr-2"
                      onClick={() => handleSaveEdit(order._id)}
                    >
                      <FaSave />
                    </button>
                    <button
                      className="text-red-500 mr-2"
                      onClick={handleCancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
                {!editOrderId && (
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEdit(order)}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(order._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManage;
