import React from "react";
import Card from "../card/card";
import "./cards.css";

function Cards({ allCountries }) {
  return (
    <div className="cards-list">
      {allCountries?.map((country) => (
        <Card country={country} />
      ))}
    </div>
  );
}

export default Cards;
