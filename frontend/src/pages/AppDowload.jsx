import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="text-center py-24 font-medium text-secondary dark:text-ternary-dark">
      <p className="text-lg md:text-xl lg:text-2xl">
        For Better Experience Download <br /> Tomato App
      </p>
      <div className="flex justify-center gap-4 mt-10">
        <img
          src={assets.play_store}
          alt="Play Store"
          className="w-32 sm:w-36 lg:w-40 hover:scale-110 transition-transform duration-500"
        />
        <img
          src={assets.app_store}
          alt="App Store"
          className="w-32 sm:w-36 lg:w-40 hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default AppDownload;
