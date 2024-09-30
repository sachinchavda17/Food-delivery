import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import loadingSvg from "../assets/loading.svg";
import AlertModal from "../modal/AlertModal";
import ManageModal from "../modal/MenuModal";
import { StoreContext } from "../utils/StoreContext";
import { deleteDataApi, getDataApi } from "../utils/api";
import MenuCard from "../components/MenuCard"; // Import the new MenuCard component

const ManageMenu = () => {
  const { token } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDataApi("/api/menu/list");
      if (!response.success) {
        toast.error(response?.error || "Failed to get menu list.");
      } else {
        setMenuData(response?.menuItems);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDeleteClick = (item) => {
    setIsAlertOpen(true);
    setSelectedMenuId(item);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      const response = await deleteDataApi(
        `/api/menu/delete/${selectedMenuId._id}`,
        token
      );
      if (response.success) {
        setMenuData(menuData.filter((item) => item._id !== selectedMenuId._id));
        setIsAlertOpen(false);
        toast.success("Item deleted");
      }
    } catch (error) {
      toast.error("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu) => {
    setCurrentMenu(menu);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentMenu(null);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center flex-col items-center min-h-screen animate-pulse transition">
        <img src={loadingSvg} alt="Loading" />
        <span className="ml-2 text-lg">Loading Menu's...</span>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20 w-full min-h-screen bg-background dark:bg-secondary-dark transition duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-ternary transition-all duration-300">
        Manage Menu
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6 ">
        <button
          className="dark:shadow-background-dark dark:text-ternary shadow-md hover:shadow-lg px-4 py-10 rounded flex flex-col items-center transition duration-300"
          onClick={handleAddNew}
        >
          <FaPlus className="mb-2" /> <span>Add New Menu</span>
        </button>
        {menuData.length === 0 ? (
          <p className="text-center text-secondary dark:text-ternary-dark">
            No Menu available.
          </p>
        ) : (
          menuData.map((menu) => (
            <MenuCard
              key={menu._id}
              menu={menu}
              handleEdit={handleEdit}
              handleDeleteClick={handleDeleteClick}
            />
          ))
        )}
      </div>

      {modalOpen && (
        <ManageModal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          currentMenu={currentMenu}
          setMenuData={setMenuData}
        />
      )}
      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onDelete={handleDeleteConfirm}
          userName={selectedMenuId?.name}
        />
      )}
    </div>
  );
};

export default ManageMenu;
