import React, { useState } from "react";
import Banner from "../components/Banner";
import ExploreMenu from "../components/ExploreMenu";
import Foods from "../components/Foods";
import Cart from "../components/Cart";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="">
      <Banner />
      <ExploreMenu category={category} setCategory={setCategory} />
      <Foods category={category} />


    </div>
  );
};

export default Home;
