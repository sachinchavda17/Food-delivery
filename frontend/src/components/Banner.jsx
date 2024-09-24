import React from "react";
import bannerImg from "../assets/header_img.png"; // Ensure the path is correct

const Banner = () => {
  return (
    <div
      className="relative h-[34vw] top-12 my-10 rounded-2xl mx-auto bg-cover bg-no-repeat  "
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]">
        <h2 className="font-medium text-white text-[max(4.5vw,22px)] dark:text-secondary">
          Order your favourite food here
        </h2>
        <p className="text-white dark:text-secondary text-[1vw]">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
        <button className="bg-white dark:bg-secondary text-[#747474] dark:text-gray-300 font-medium py-[1vw] px-[2.3vw] rounded-full text-[max(1vw,13px)]">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Banner;
