import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { getStatusColor } from "../utils/helpers";
import AlertModal from "../modal/AlertModal";

const OrderRow = ({
  order,
  editOrderId,
  editData,
  setEditData,
  handleEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleDelete,
}) => {
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Handle the delete click which opens the modal
  const handleDeleteClick = (order) => {
    setSelectedOrder(order); // Set the order to be deleted
    setIsAlertOpen(true); // Open the alert modal
  };

  // Function to be called after confirming the delete action
  const handleConfirmDelete = () => {
    handleDelete(selectedOrder); // Delete the selected order
    setIsAlertOpen(false); // Close the modal
  };

  return (
    <>
      <tr
        key={order._id}
        className="border-b dark:border-gray-600 hover:bg-ternary transition dark:hover:bg-secondary-dark"
      >
        <td className="py-3 px-4">{order._id}</td>
        <td className="py-3 px-4">
          {new Date(order.createdAt).toLocaleDateString()}
        </td>
        <td className="py-3 px-4">&#8377;{order.totalPrice}</td>
        <td className="py-3 px-4">
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
        <td className="py-3 px-4">
          {editOrderId === order._id ? (
            <select
              value={editData.orderStatus}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  orderStatus: e.target.value,
                })
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
              )}`}
            >
              {order.orderStatus}
            </span>
          )}
        </td>
        <td className="py-3 px-4">
          {order.deliveryAddress.street}, {order.deliveryAddress.city}
        </td>
        <td className="py-3 px-4">
          {new Date(order.updatedAt).toLocaleString()}
        </td>
        <td className="py-3 px-4 flex items-center justify-center gap-3">
          {editOrderId === order._id ? (
            <>
              <button
                className="text-green-500 "
                onClick={() => handleSaveEdit(order._id)}
              >
                <FaSave className="text-lg" />
              </button>
              <button className="text-red-500 " onClick={handleCancelEdit}>
                <FaTimes className="text-lg" />
              </button>
            </>
          ) : (
            <>
              <button
                className="text-blue-500"
                onClick={() => handleEdit(order)}
              >
                <FaEdit className="text-lg" />
              </button>
            </>
          )}
          <button
            className="text-red-600"
            onClick={() => handleDeleteClick(order)}
          >
            <FaTrash className="text-lg" />
          </button>
        </td>
      </tr>

      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onDelete={handleConfirmDelete} // Pass the confirm delete function
          userName={selectedOrder?._id}
        />
      )}
    </>
  );
};

export default OrderRow;
