import { FaTruck, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"; 

// Function to return the status icon based on order status
export const getStatusIcon = (status) => {
  switch (status) {
    case "Delivered":
      return <FaCheckCircle className="text-green-500" size={24} />;
    case "Cancelled":
      return <FaTimesCircle className="text-red-500" size={24} />;
    case "Out for Delivery":
      return <FaTruck className="text-blue-500" size={24} />;
    case "Pending":
      return <FaClock className="text-yellow-500" size={24} />;
    default:
      return <FaClock className="text-yellow-500" size={24} />; // Fallback icon
  }
};

// Function to return the CSS class based on order status
export const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-200 text-yellow-700";
    case "Cancelled":
    case "Failed":
      return "bg-red-200 text-red-700";
    case "Out for Delivery":
      return "bg-blue-200 text-blue-700";
    case "Delivered":
    case "Paid":
      return "bg-green-200 text-green-700";
    default:
      return "bg-gray-200 text-gray-700"; // Fallback class
  }
};
