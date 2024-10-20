import React, { useContext } from "react";
import { FaUserShield, FaTwitter, FaLinkedin,FaGithub } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { getDataApi } from "../utils/api";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { StoreContext } from "../utils/StoreContext";

const Footer = () => {
  const [menuData, setMenuData] = useState([]);
  const {token} = useContext(StoreContext)
  const portfolio = process.env.REACT_APP_PORTFOLIO;
  const insta = process.env.REACT_APP_INSTA;
  const linkedin = process.env.REACT_APP_LINKEDIN;
  const github = process.env.REACT_APP_GITHUB;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataApi("/api/menu/list");
        if (!response.success) {
          toast.error(response?.error || "Failed to get menu list.");
        } else {
          setMenuData(response?.menuItems);
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, [token]);

  return (
    <footer
      className="bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 py-8 pb-20 md:py-10 transition-all duration-300 "
      style={{ boxShadow: "0px 20px 10px 15px" }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left - Logo and Social Icons */}
          <div className="flex flex-col space-y-4">
            <span
              className="text-3xl font-bold text-primary dark:text-primary-dark"
              style={{ fontFamily: "Kalam" }}
            >
              BiteHub24
            </span>
            <p className="dark:text-ternary-dark text-gray-700 text-sm md:text-base">
              The BiteHub24 is a modern and responsive food delivery platform
              that offers users a seamless experience for exploring and ordering
              top dishes. It features an aesthetically pleasing design with
              support for both light and dark modes, catering to a broad range
              of user preferences.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            {menuData.length === 0 ? (
              <>
                <h2 className="text-lg md:text-xl font-semibold text-secondary dark:text-ternary-dark">
                  Menu
                </h2>
                <ul className="space-y-2">
                  <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">
                    Home
                  </li>
                  <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">
                    About Us
                  </li>
                  <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">
                    Delivery
                  </li>
                  <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">
                    Privacy Policy
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-lg md:text-xl font-semibold text-secondary dark:text-ternary-dark">
                  Menu
                </h2>
                <ul className="space-y-2">
                  {menuData.slice(0, 5).map((menu,id) => (
                    <li
                      className="hover:text-primary dark:hover:text-primary-dark cursor-pointer"
                      key={id}
                    >
                      {menu.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right - Contact Information */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-secondary dark:text-ternary-dark">
              Get in Touch
            </h2>
            <ul className="space-y-2">
              <li className="hover:text-primary dark:hover:text-primary-dark">
                +91 98750 #####
              </li>
              <li className="hover:text-primary dark:hover:text-primary-dark">
                contact@bitehub24.com
              </li>
            </ul>
            <div className="flex space-x-4">
              <a
                href={portfolio ? portfolio : "/"}
                aria-label="portfolio"
                className="hover:text-primary dark:hover:text-primary-dark hover:cursor-pointer"
              >
                <FaUserShield className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href={
                  insta
                    ? `https://instagram.com/${insta}`
                    : "https://instagram.com"
                }
                target="_blank"
                aria-label="Instagram"
                className="hover:text-primary dark:hover:text-primary-dark hover:cursor-pointer"
              >
                <AiFillInstagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href={
                  linkedin
                    ? `https://linkedin.com/in/${linkedin}`
                    : "https://linkedin.com"
                }
                target="_blank"
                aria-label="LinkedIn"
                className="hover:text-primary dark:hover:text-primary-dark hover:cursor-pointer"
              >
                <FaLinkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href={
                  linkedin
                    ? `https://github.com/${github}`
                    : "https://github.com"
                }
                target="_blank"
                aria-label="GitHub"
                className="hover:text-primary dark:hover:text-primary-dark hover:cursor-pointer"
              >
                <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t dark:border-secondary-dark border-gray-300 mt-8 md:mt-10 pt-5">
          <p className="text-center text-gray-700 dark:text-ternary-dark text-sm md:text-base">
            &copy; 2024 BiteHub24.com - Created by <span className="text-primary hover:text-accent cursor-pointer border-b border-primary-light">Sachin Chavda</span> 
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
