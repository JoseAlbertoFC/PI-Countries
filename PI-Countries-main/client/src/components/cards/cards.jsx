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

//...El componente "cards" recibe por props array de objetos, donde cada objeto
//...es un country, posteriormente en el renderizado, mapeamos dicho array 
//...para obtener cada "card"/"country" con toda su informacion.