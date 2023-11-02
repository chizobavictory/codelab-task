import React from "react";
import Navbar from "../components/Navbar";
import User from "../components/User";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="px-20 ">
        <User />
      </div>
    </div>
  );
};

export default Home;
