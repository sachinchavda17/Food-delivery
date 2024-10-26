import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import loadingSvg from "../assets/loading.svg";
import AlertModal from "../modal/AlertModal";
import PromoCodeModal from "../modal/PromoCodeModal";
import { StoreContext } from "../utils/StoreContext";
import { deleteDataApi, getDataApi } from "../utils/api";

const ManagePromoCode = () => {
  const { token } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [promoCodes, setPromoCodes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPromoCode, setCurrentPromoCode] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedPromoCodeId, setSelectedPromoCodeId] = useState(null);

  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const response = await getDataApi("/api/promocode/list",token);
      if (!response.success) {
        toast.error(response?.error || "Failed to get promo codes.");
      } else {
        setPromoCodes(response?.promoCodes);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, [token]);

  const handleDeleteClick = (item) => {
    setIsAlertOpen(true);
    setSelectedPromoCodeId(item);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      const response = await deleteDataApi(
        `/api/promocode/delete/${selectedPromoCodeId._id}`,
        token
      );
      if (response.success) {
        setPromoCodes(
          promoCodes.filter((item) => item._id !== selectedPromoCodeId._id)
        );
        setIsAlertOpen(false);
        toast.success("Promo code deleted");
      }
    } catch (error) {
      toast.error("Failed to delete promo code");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (promoCode) => {
    setCurrentPromoCode(promoCode);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentPromoCode(null);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center flex-col items-center min-h-screen animate-pulse transition">
        <img src={loadingSvg} alt="Loading" />
        <span className="ml-2 text-lg dark:text-ternary">Loading Promo Codes...</span>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 w-full min-h-screen bg-background dark:bg-secondary-dark transition duration-300">
      <h2 className="text-3xl font-bold mb-8 text-center dark:text-ternary transition-all duration-300">
        Manage Promo Codes
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6 ">
        <button
          className="dark:shadow-background-dark dark:text-ternary shadow-md hover:shadow-lg px-4 py-10 rounded flex flex-col items-center transition duration-300 hover:scale-105"
          onClick={handleAddNew}
        >
          <FaPlus className="mb-2" /> <span>Add New Promo Code</span>
        </button>

        {promoCodes.length === 0 ? (
          <p className="text-center text-secondary dark:text-ternary-dark col-span-full">
            No Promo Codes available.
          </p>
        ) : (
          promoCodes.map((promoCode) => (
            <div
              key={promoCode._id}
              className="p-4 rounded-lg hover:shadow-lg shadow-md transition-transform transform dark:shadow-background-dark hover:scale-105"
            >
              <h3 className="sm:text-xl font-bold mb-2 text-gray-800 dark:text-white">
                {promoCode.code}
              </h3>
              <p className=" text-xs sm:text-md text-gray-600 dark:text-gray-400 mb-2">
                Discount:{" "}
                <span className="font-semibold">{promoCode.discount}%</span>
              </p>
              <div className="flex justify-between gap-5">
                <button
                  className="text-blue-500 hover:text-blue-600  font-semibold py-2 px-3 rounded-lg transition-all duration-300"
                  onClick={() => handleEdit(promoCode)}
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  className="text-red-500 hover:text-red-600 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  onClick={() => handleDeleteClick(promoCode)}
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <PromoCodeModal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          currentPromoCode={currentPromoCode}
          setPromoCodes={setPromoCodes}
        />
      )}
      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onDelete={handleDeleteConfirm}
          userName={selectedPromoCodeId?.code}
        />
      )}
    </div>
  );
};

export default ManagePromoCode;
