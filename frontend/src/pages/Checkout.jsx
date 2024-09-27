import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StoreContext } from "../utils/StoreContext";
import { postDataApi, getDataApi, updateData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AddressPopup from "../model/AddAddress";

const Checkout = () => {
  const { cartSubTotal, cartItems, token } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getDataApi("/api/user/profile", token);
        if (response.success) {
          setAddresses(response.user.addresses);
        }
      } catch (error) {
        toast.error("Error fetching addresses");
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Submit order
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          food: item.food._id,
          quantity: item.quantity,
        })),
        deliveryAddress: selectedAddress || {
          street: data.street,
          city: data.city,
          postalCode: data.zip,
          country: data.country,
        },
        paymentMethod: paymentMethod,
      };
      console.log(orderData);
      const response = await postDataApi("/api/orders/place", orderData, token);

      if (response.success) {
        window.location.href = response.session_url;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle opening the address popup
  const handleOpenAddressPopup = () => {
    setIsAddressPopupOpen(true);
  };

  // Handle closing the address popup
  const handleCloseAddressPopup = () => {
    setIsAddressPopupOpen(false);
  };

  // Handle adding a new address (submit popup form)
  const handleAddAddress = async (data) => {
    try {
      const response = await updateData(
        "/api/user/profile-update",
        data,
        token
      );
      if (response.success) {
        setAddresses([...addresses, response.user.addresses]);
        setIsAddressPopupOpen(false);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address.");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return navigate("/");
  }

  return (
    <div className="checkout-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="checkout-form flex flex-col lg:flex-row justify-between gap-24 py-24 dark:text-ternary "
      >
        {/* Left Side: Address and Payment Method */}
        <div className="checkout-left w-full lg:max-w-1/3 ">
          <p className="title text-3xl font-semibold dark:text-background">
            Checkout
          </p>

          {/* Payment Method */}
          <div className="payment-method my-6 ">
            <p className="text-lg font-semibold mb-4">Payment Method</p>
            <div className="flex gap-5 dark:text-ternary-light">
              <div
                className={`address-item p-3 border ${
                  paymentMethod === "Card"
                    ? "border-primary"
                    : "border-gray-300"
                } rounded-md mb-3 cursor-pointer w-full`}
                onClick={() => setPaymentMethod("Card")}
              >
                Card
              </div>
              <div
                className={`address-item p-3 border ${
                  paymentMethod === "cod" ? "border-primary" : "border-gray-300"
                } rounded-md mb-3 cursor-pointer w-full`}
                onClick={() => setPaymentMethod("cod")}
              >
                Cash on Delivery
              </div>
            </div>
          </div>

          {/* Add Address Button */}
          <button
            type="button"
            onClick={handleOpenAddressPopup}
            className="add-address-btn mb-6 bg-primary  text-white py-3 px-4 rounded-lg hover:bg-accent transition"
          >
            + Add New Address
          </button>

          {/* List of saved addresses */}
          <div className="saved-addresses">
            <p className="text-lg font-semibold mb-4">Saved Addresses</p>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address._id}
                  className={`address-item p-3 border ${
                    selectedAddress?._id === address._id
                      ? "border-primary"
                      : "border-gray-300"
                  } rounded-md mb-3 cursor-pointer dark:text-ternary-light`}
                  onClick={() => setSelectedAddress(address)}
                >
                  <p>
                    {address.street}, {address.city}
                  </p>
                  <p>
                    {address.postalCode}, {address.country}
                  </p>
                </div>
              ))
            ) : (
              <p>No saved addresses found.</p>
            )}
          </div>
        </div>

        {/* Right Side: Cart Totals */}
        <div className="checkout-right w-full lg:max-w-1/3 bg-light p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-5 dark:text-background">Cart Totals</h2>
          <div className="space-y-4 dark:text-ternary-light">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>&#8377;{cartSubTotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>{cartSubTotal === 0 ? 0 : 2}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>
                &#8377;
                {(Number(cartSubTotal) + (cartSubTotal === 0 ? 0 : 2)).toFixed(
                  2
                )}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-accent transition"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : paymentMethod === "cod"
              ? "PLACE ORDER"
              : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </form>

      {/* Address Popup Modal */}
      {isAddressPopupOpen && (
        <AddressPopup
          onClose={handleCloseAddressPopup}
          onSave={handleAddAddress}
        />
      )}
    </div>
  );
};

export default Checkout;
