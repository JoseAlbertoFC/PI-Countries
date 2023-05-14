import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card({ country }) {
  const { id, name, image, continent } = country;

  return (
    <div className="card-container">
      <Link to={`/home/${id}`}>
        <img
          src={image}
          alt={"No fue posible cargar imagen."}
          className="mainImage"
        />
      </Link>
      <h2>{name}</h2>
      <p>{continent}</p>
    </div>
  );
}

export default Card;
