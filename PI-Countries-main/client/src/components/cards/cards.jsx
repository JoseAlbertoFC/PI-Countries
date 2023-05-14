import React from "react";
import Card from "../card/card";
import "./cards.css";

function Cards({ allCountries }) {
  const countriesList = allCountries;
  return (
    <div className="cards-list">
      {countriesList?.map((country) => (
        <Card country={country} />
      ))}
    </div>
  );
}

export default Cards;
