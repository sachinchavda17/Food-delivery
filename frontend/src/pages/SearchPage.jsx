import React, { useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom"
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import loadingSvg from "../assets/loading.svg";
import { getDataApi } from "../utils/api";
import { StoreContext } from "../utils/StoreContext";
import { toast } from "react-hot-toast";
import FoodItem from "../components/FoodItem";
import { AiOutlineSearch } from "react-icons/ai";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { token } = useContext(StoreContext);
  const navigate = useNavigate()

  // Fetch search results based on the search term
  const handleSearch = async (term) => {
    if (!term) return;

    setLoading(true);
    setNoResults(false);
    navigate(`/search?query=${term}`)
    try {
      const response = await getDataApi(`/api/foods/search?query=${term}`);
      if (response.success) {
        setSearchResults(response?.foods);
        if (response.foods.length === 0) {
          setNoResults(true);
        }
      } else {
        toast.error(response.error || "Failed to fetch search results.");
      }
    } catch (error) {
      toast.error("Error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults([]);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    navigate(`/search`)
    setSearchResults([]);
    setNoResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="pt-24 p-6 w-full min-h-screen bg-background dark:bg-secondary-dark transition duration-300">
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-center dark:text-ternary transition-all duration-300">
          Search Here...
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full max-w-xl relative"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a menu or food item..."
            className="w-full text-lg px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background-light dark:bg-gray-700 dark:text-gray-200 transition duration-300"
          />
          {searchTerm && (
            <FaTimesCircle
              className="absolute right-20 transition duration-300 text-xl text-gray-400 cursor-pointer hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500"
              onClick={handleClearSearch}
            />
          )}
          <button
            type="submit"
            className="bg-primary text-2xl text-white dark:text-black px-4 py-3 rounded-lg ml-3 transition duration-300 dark:bg-primary-dark hover:bg-accent focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-white dark:focus:ring-offset-black"
          >
            <AiOutlineSearch />
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="w-full flex justify-center flex-col items-center  animate-pulse">
          <img src={loadingSvg} alt="Loading" className="mb-3" />
          <span className="text-lg text-center dark:text-ternary">
            Searching...
          </span>
        </div>
      ) : (
        <>
          {/* Display Search Results */}
          {noResults ? (
            <div className="text-center text-gray-500 dark:text-ternary mt-8">
              No results found for "<strong>{searchTerm}</strong>"
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-5 mt-7 gap-x-10">
              {searchResults?.map((item) => (
                <FoodItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
