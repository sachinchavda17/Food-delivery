import React, { useEffect, useState } from "react";
import noInternetSvg from "../assets/no-internet.png"; // Add an appropriate SVG/image for no internet

const NoInternetPage = ({isOnline, setIsOnline}) => {

  const reloadPage = () => {
    window.location.reload();
  };

  if (isOnline) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-background-dark text-center p-6 transition-all duration-300">
      <img
        src={noInternetSvg}
        alt="No Internet"
        className="w-48 h-48 mb-6"
      />
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        No Internet Connection
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        It seems you are offline. Check your connection and try again.
      </p>
      <button
        onClick={reloadPage}
        className="bg-primary text-white py-2 px-6 rounded-lg shadow hover:bg-accent transition-colors duration-300"
      >
        Retry
      </button>
    </div>
  );
};

export default NoInternetPage;
