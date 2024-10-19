import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/header_img.png";
import img2 from "../assets/banner-2.png";
import img3 from "../assets/banner-3.png";
import img4 from "../assets/banner-4.png";
import img5 from "../assets/banner-5.png";
import img6 from "../assets/banner-6.png";
import img7 from "../assets/banner-7.png";
import img8 from "../assets/banner-8.png";
import img9 from "../assets/banner-9.png";
import img10 from "../assets/banner-10.png";
import img11 from "../assets/banner-11.png";
import img12 from "../assets/banner-12.png";

const Banner = () => {
  const navigate = useNavigate();

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img7,
    img9,
    img10,
    img11,
    img12,
  ];

  // Slick carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <Slider {...settings} className="relative top-12 my-10 rounded-2xl mx-auto">
      {images.map((image, index) => (
        <div key={index}>
          <div
            className="relative h-[50vh] md:h-[34vw] bg-center bg-cover bg-no-repeat rounded-2xl overflow-hidden bg-opacity-30"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute w-full h-full bg-background-dark opacity-30"></div>
            <div className="absolute flex flex-col items-start gap-4 max-w-[80%] sm:max-w-[60%] md:max-w-[50%] bottom-[5%] left-4 sm:left-[6vw]">
              <h2
                className={`font-medium text-white text-3xl sm:text-4xl md:text-5xl leading-tight`}
              >
                Order your favourite food here
              </h2>
              <p
                className={`text-white text-md sm:text-lg md:text-xl leading-relaxed`}
              >
                Choose from a diverse menu featuring a delectable array of
                dishes crafted with the finest ingredients and culinary
                expertise.
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="bg-white dark:bg-secondary text-[#747474] dark:text-gray-300 font-medium py-[3vw] px-[5vw] sm:py-[2vw] sm:px-[4vw] md:py-[1vw] md:px-[2.3vw] rounded-full text-[max(4vw,13px)] sm:text-[max(2vw,13px)] md:text-[max(1vw,13px)]"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
