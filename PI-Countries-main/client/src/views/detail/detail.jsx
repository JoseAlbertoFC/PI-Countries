import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./detail.css";

function Detail() {
  const { id } = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/countries/${id}`).then((response) => {
      setCountry(response.data);
    });
  }, [id]);
  console.log(country);
  return (
    <div className="firs-container">
      <div className="second-container">
        <img
          src={country.image}
          alt="No fue posible cargar la imagen"
          className="imagen"
        />
        <h2>{country.name}</h2>
        <p>{country.id}</p>
        <p>{country.continent}</p>
        <p>{country.subregion}</p>
        <p>{country.area + " m²"}</p>
        <p>{country.population + " People"}</p>
        <p>{country.Activities?.map((act) => <p>{act.name && act.name}</p>)}</p>
      </div>
    </div>
  );
}

export default Detail;
