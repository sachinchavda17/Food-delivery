import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import loadingSvg from "../assets/loading.svg";
import { getDataApi, deleteDataApi, putDataApi } from "../utils/api";
import { StoreContext } from "../utils/StoreContext";
import OrderRow from "../components/OrderRow";

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editData, setEditData] = useState({
    paymentStatus: "",
    orderStatus: "",
  });

  const { token } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
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
        setLoading(false);
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

  const handleDelete = async (data) => {
    try {
      const response = await deleteDataApi(
        `/api/orders/delete/${data._id}`,
        token
      );
      if (response.success) {
        toast.success(response.message || "Order Removed Successfully");
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== data._id)
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
    <div className="p-6 pb-20 order-manage w-full min-h-screen bg-background dark:bg-secondary-dark text-sm transition-all duration-300">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-ternary">
        Order Management
      </h2>
      <div className="container mx-auto overflow-x-auto rounded-lg shadow-lg">
        {orders.length === 0 ? (
          <p className="text-center text-secondary dark:text-ternary-dark">
            No orders available.
          </p>
        ) : (
          <table className="w-full text-center rounded-lg bg-background-light dark:bg-secondary dark:text-ternary-dark shadow-md">
            <thead>
              <tr className="bg-primary dark:bg-primary-dark text-ternary ">
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Total Amount</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
                <th className="py-3 px-4 font-semibold">Order Status</th>
                <th className="py-3 px-4 font-semibold">Address</th>
                <th className="py-3 px-4 font-semibold">Last Update</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  editOrderId={editOrderId}
                  editData={editData}
                  setEditData={setEditData}
                  handleEdit={handleEdit}
                  handleSaveEdit={handleSaveEdit}
                  handleCancelEdit={handleCancelEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderManage;
