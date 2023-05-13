import React from "react";
import Navbar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import "./home.css";

function Home() {
  return (
    <div className='home'>
      <h2 className='home-title'>Fun with Flags!</h2>
      <Navbar />
      <Cards />
    </div>
  );
}

export default Home;
