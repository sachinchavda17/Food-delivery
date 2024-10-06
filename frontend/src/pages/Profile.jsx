import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../utils/StoreContext";
import { getDataApi, updateData } from "../utils/api"; // Add the update API method
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false); // To control edit state
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataApi("/api/user/profile", token);
        if (response.success) {
          setUser(response.user);
        } else {
          return toast.error(
            response.error || "Failed to fetch your profile data."
          );
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch your profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Function to handle profile save changes
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateData(
        "/api/user/profile-update",
        user,
        token
      );
      if (response.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false); // Disable editing after saving
      } else {
        toast.error(response.error || "Failed to update profile.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    }
  };

  // Show only the two most recent orders
  const recentOrders = user?.orders?.slice(-2).reverse() || [];

  return (
    <div className="container mx-auto p-8 pt-24 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Left Section - Profile Info */}
        <div className="md:w-1/3 bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-xl dark:shadow-background-dark transition-all duration-300">
          <div className="flex justify-center bg-white dark:bg-secondary-dark dark:text-ternary ">
            <div className="flex justify-center items-center w-32 h-32 text-6xl rounded-full shadow-xl dark:shadow-background-dark mb-4">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary dark:text-primary-dark text-center">
            {user?.name}
          </h2>
          <p className="text-gray-600 dark:text-ternary-dark text-center">
            {user?.email}
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-secondary dark:text-secondary-dark">
              Address
            </h3>
            {user?.addresses?.map((addr, ind) => (
              <p
                className="text-gray-500 dark:text-ternary-dark px-2 py-1 my-1 rounded-lg bg-background-light dark:bg-secondary"
                key={ind}
              >
                {addr.street}, {addr.city}, {addr.postalCode}, {addr.country}
              </p>
            ))}
          </div>
        </div>

        <div className="md:w-2/3 mb-6 md:mt-0 md:ml-8">
          {/* Edit Profile Section */}
          <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-xl dark:shadow-background-dark transition-all duration-300">
            <h3 className="text-xl font-semibold text-secondary dark:text-secondary-dark mb-4">
              {isEditing ? "Edit Profile" : "Profile"}
            </h3>

            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-ternary-dark">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-secondary dark:text-gray-200 transition"
                  value={user?.name}
                  disabled={!isEditing} // Disable input if not editing
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-ternary-dark">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-secondary dark:text-gray-200 transition"
                  value={user?.email}
                  disabled={!isEditing} // Disable input if not editing
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-ternary-dark">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-secondary dark:text-gray-200 transition"
                  value={user?.phone}
                  disabled={!isEditing} // Disable input if not editing
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              {isEditing && (
                <div className="flex gap-4 ">
                  <button className="w-full py-2 px-4 bg-primary  dark:bg-primary-dark hover:bg-accent text-white rounded-md shadow-md">
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full py-2 px-4 bg-background-light   dark:bg-secondary dark:text-ternary rounded-md shadow-md "
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full mt-4 py-2 px-4 bg-background-light  dark:bg-secondary dark:text-ternary rounded-md shadow-md "
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Right Section - Recent Orders */}
          <div className="bg-white dark:bg-secondary-dark p-6 mt-6 rounded-lg shadow-xl dark:shadow-background-dark transition-all duration-300 ">
            <h3 className="text-xl font-semibold text-secondary dark:text-ternary mb-4">
              Recent Orders
            </h3>

            {/* Orders List */}
            <ul className="space-y-4 mb-3">
              {recentOrders.map((order, ind) => (
                <li
                  className="p-4 bg-background-light dark:bg-secondary rounded-md shadow-sm"
                  key={ind}
                >
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-ternary-dark">
                      Order #{order?.orderId} - &#8377; {order?.totalPrice}
                    </p>
                    <button className="text-primary dark:text-primary-dark underline">
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to={"/myorders"}
              className={
                "text-primary hover:text-accent transition text-lg pt-3 hover:underline"
              }
            >
              View all orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
