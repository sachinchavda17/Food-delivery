import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-secondary-dark text-center transition-all duration-300">
      <h1 className="text-6xl font-bold text-primary dark:text-primary-dark mb-4">
        404
      </h1>
      <p className="text-2xl text-secondary  dark:text-ternary mb-8">
        Oops! Page Not Found.
      </p>
      <p className="text-lg text-ternary-light mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-accent transition duration-300 dark:bg-primary-dark dark:hover:bg-accent-dark"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
