import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background dark:bg-background-dark shadow-inner  text-gray-900 dark:text-gray-100 py-10 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left - Logo and Social Icons */}
          <div className="flex flex-col space-y-4">
            <span className="text-3xl font-bold text-primary dark:text-primary-dark">Tomato.</span>
            <p className="dark:text-ternary-dark text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-primary dark:hover:text-primary-dark">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary dark:hover:text-primary-dark">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary dark:hover:text-primary-dark">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Center - Company Links */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold text-secondary dark:text-ternary-dark">Company</h2>
            <ul className="space-y-2">
              <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">Home</li>
              <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">About Us</li>
              <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">Delivery</li>
              <li className="hover:text-primary dark:hover:text-primary-dark cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Right - Contact Information */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold text-secondary dark:text-ternary-dark">Get in Touch</h2>
            <ul className="space-y-2">
              <li className="hover:text-primary dark:hover:text-primary-dark">+1-212-456-7890</li>
              <li className="hover:text-primary dark:hover:text-primary-dark">contact@tomato.com</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t dark:border-secondary-dark border-gray-300 mt-10 pt-5">
          <p className="text-center text-gray-700 dark:text-ternary-dark">
            &copy; 2024 Tomato.com - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
