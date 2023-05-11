import React from "react";
import Navbar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import "./home.css";

function Home() {
  return (
    <div>
      <h2>Esta es la Home Page</h2>
      <Navbar />
      <Cards />
    </div>
  );
}

export default Home;
