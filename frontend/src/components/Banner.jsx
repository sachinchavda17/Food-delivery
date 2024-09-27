import React from "react";
import bannerImg from "../assets/header_img.png"; // Ensure the path is correct

const Banner = () => {
  return (
    <div
      className="relative h-[50vh] md:h-[34vw] top-12 my-10 rounded-2xl mx-auto bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute flex flex-col items-start gap-4 max-w-[80%] sm:max-w-[60%] md:max-w-[50%] bottom-[5%] left-4 sm:left-[6vw]">
        <h2 className="font-medium text-white text-[max(6vw,22px)] sm:text-[max(5vw,22px)] md:text-[max(4.5vw,22px)]  leading-tight">
          Order your favourite food here
        </h2>
        <p className="text-white text-[3.5vw] sm:text-[2.5vw] md:text-[1.5vw] leading-relaxed">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
        </p>
        <button className="bg-white dark:bg-secondary text-[#747474] dark:text-gray-300 font-medium py-[3vw] px-[5vw] sm:py-[2vw] sm:px-[4vw] md:py-[1vw] md:px-[2.3vw] rounded-full text-[max(4vw,13px)] sm:text-[max(2vw,13px)] md:text-[max(1vw,13px)]">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Banner;
