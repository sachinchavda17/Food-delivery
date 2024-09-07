import React from "react";
import bannerImg from "../assets/frontend_assets/header_img.png"; // Ensure the path is correct

const Banner = () => {
  return (
    <div
      className="relative h-[400px] lg:h-[89vh] w-full"
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text and Button Section */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-16 lg:px-20">
        <h2 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl max-w-[50%] leading-tight animate-fade-slide-up">
          Order your favourite food here
        </h2>
        <p className="text-white text-base md:text-lg mt-3 max-w-[50%] animate-fade-slide-up delay-150">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
        <button className="mt-6 bg-white text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition transform hover:scale-105 animate-fade-slide-up delay-300">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Banner;
