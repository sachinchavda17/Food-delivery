import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postDataApi } from "../utils/api";
import loadingSvg from "../assets/loading.svg";
import { StoreContext } from "../utils/StoreContext";

const VarifyOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { token } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        setLoading(true);
        // Make an API request to verify order
        const response = await postDataApi(
          "/api/orders/verify",
          {
            orderId,
            success,
          },
          token
        );
        if (response.success) {
          setResult(response.message);
        } else {
          setResult(response.error);
        }
        // Show modal after verification is done
      } catch (error) {
        console.error("Verification error:", error);
        setResult("There was an error verifying the payment.");
      } finally {
        setLoading(false);
        setShowModal(true);
      }
    };

    if (orderId) {
      verifyOrder();
    }
  }, [orderId, success]);

  return (
    <div className="flex justify-center items-center h-screen ">
      {loading ? (
        <div className="flex flex-col items-center animate-pulse">
          <img src={loadingSvg} alt="Loading" className="w-24 h-24 mb-4" />
          <p className="mt-2 dark:text-white text-lg font-semibold">
            Verifying your order...
          </p>
        </div>
      ) : (
        showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 transition duration-300 ease-in-out">
            <div className="bg-white dark:bg-gray-900 m-2 p-6 rounded-xl shadow-xl w-96 transform scale-105 transition-all duration-500 ease-out">
              <h2
                className={`text-lg font-bold mb-4 text-center ${
                  result === "Order Paid Successfully" ||
                  result === "Order Placed Successfully"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {result === "Order Paid Successfully" ||
                result === "Order Placed Successfully"
                  ? "Order Verified 🎉"
                  : "Order Verification Failed ❌"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
                {result}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                <span className="font-semibold">Order ID:</span> #{orderId}
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    navigate("/"); // Navigate to home or other pages after closing
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default VarifyOrder;
