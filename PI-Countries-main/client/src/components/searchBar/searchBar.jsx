import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabeticalOrder,
  populationOrder,
  continentFilter,
  getActivities,
  activityFilter,
} from "../../redux/actions";
import "./searchBar.css";

function SearchBar({ handleChange, handleSubmit, totalPages}) {   //...Recivimos props desde el home.
  const dispatch = useDispatch();                                 //...Utilixamos el useDispatch para poder despachar acciones a redux
  const activities = useSelector((state) => state.Activities);    //...y el useSelector para poder acceder a los estados de la store.

  const handleAlfOrderChange = (event) => {        //...Esta funcion va a despachar la action "alphabeticalOrder" cada vez
    const selectedOrder = event.target.value;      //...que se elija una opcion en su selector, esto va a permitir ordenar 
    if (selectedOrder === "A-Z") {                 //...los paises alfabeticamente de forma ascendente o descendente.
      dispatch(alphabeticalOrder("asc"));
    } else if (selectedOrder === "Z-A") {
      dispatch(alphabeticalOrder("desc"));
    } else {
      dispatch(alphabeticalOrder(""));
    }
  };

  const handlePopulationOrderChange = (event) => {      //...Esta funcion va a despachar la action "populationOrder" cada vez
    const selectedOrder = event.target.value;           //...que se elija una opcion en su selector, esto va a permitir ordenar 
    if (selectedOrder === "Ascendant") {                //...los paises por orden de poblacion de forma ascendente o descendente.
      dispatch(populationOrder("asc"));
    } else if (selectedOrder === "Decrescent") {
      dispatch(populationOrder("desc"));
    } else {
      dispatch(populationOrder(""));
    }
  };

  const handleContinentChange = (event) => {           //...Esta funcion va a despachar la action "continentFilter" cada vez que 
    const selectedContinent = event.target.value;      //...se elija una opcion en su selector, esta va a filtrar los paises por
    dispatch(continentFilter(selectedContinent));      //...continente
  };

  const handleActivityChange = (event) => {            //...Esta funcion va a despachar la action "activityFilter" cada vez que
    const selectedActivity = event.target.value;       //...se elija una opcion en su selector, esta va a filtrar los paises por 
    dispatch(activityFilter(selectedActivity));        //...actividad turistica, pero solo funcionara si se ha completado el 
  };                                                   //...formulario previamente vinculando una actividad a un pais.

  useEffect(() => {
    dispatch(getActivities());                         //...Nos traemos todas las actividades que hayan sido creadas previamente
  }, [dispatch]);                                      //...para mostrarlas en el selector.

  return (
    <div className="all-options">
      <div className="order-box">
        <select onChange={handleAlfOrderChange}>
          <option value="">Alphabetical Order</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>

        <select onChange={handlePopulationOrderChange}>
          <option value="">Population Order</option>
          <option>Ascendant</option>
          <option>Decrescent</option>
        </select>

        <select onChange={handleContinentChange} totalPages={totalPages}>
          <option value="">Continent Filter</option>
          <option>Africa</option>
          <option>Antarctica</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>North America</option>
          <option>Oceania</option>
          <option>South America</option>
        </select>

        <select onChange={handleActivityChange} totalPages={totalPages}>
          <option value="">Activity Filter</option>
          {activities.length &&
            activities.map((activity, index) => (
              <option key={index} value={activity.name}>
                {activity.name}
              </option>
            ))}
        </select>
      </div>

      <form className="search-box">
        <input
          placeholder="Search"
          type="search"
          onChange={(event) => handleChange(event)}
        />

        <button onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;

//...En el selector de "Activity Filter" nos preguntamos si el array de actividades contiene algo,
//...si es asi mapeamos ese array y por cada actividad creamos una opcion en el selector con
//...el nombre de dicha actividad.