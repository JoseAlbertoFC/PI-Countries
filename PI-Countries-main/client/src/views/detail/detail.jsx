import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesById } from "../../redux/actions";

function Detail() {                                     
  const { id } = useParams();                             //...Obtenemos el id que viene en la url utilizando el useParams.                       
  const dispatch = useDispatch();                         //...Utilizamos el useDispatch para poder despachar actions a redux
  const country = useSelector((state) => state.country);  //...y el useSelector para obtener el estado country.

  useEffect(() => {                     //...Utilizamos un useEffect para despachar la action getCountriesById apenas se monta el
    dispatch(getCountriesById(id));     //...componenete y cada vez que el "id" cambie.
  }, [dispatch, id]);                                               
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
        <p>{country.capital}</p>
        <p>{country.continent}</p>
        <p>{country.subRegion}</p>
        <p>{country.area + " m²"}</p>
        <p>{country.population + " People"}</p>
        <p>{country.Activities?.map((act) => <p>{act.name && act.name}</p>)}</p>
      </div>
    </div>
  );
}

export default Detail;

//...La etiqueta de Activities utiliza un mapeo para mostrar las actividades del país. Si existen actividades (country.Activities), 
//...se muestra el nombre de cada actividad en una etiqueta <p>. En cambio, si no hay actividades, no se muestra nada.