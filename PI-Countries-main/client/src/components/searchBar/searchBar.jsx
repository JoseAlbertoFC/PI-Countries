import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  alphabeticalOrder,
  populationOrder,
  continentFilter,
  activityFilter,
} from "../../redux/actions";
import "./searchBar.css";

function SearchBar({ handleChange, handleSubmit }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const [continent, setContinent] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const activities = useSelector((state) => state.Activities);

  const handleAlfOrderChange = (event) => {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
    if (selectedOrder === "A-Z") {
      dispatch(alphabeticalOrder("asc"));
    } else if (selectedOrder === "Z-A") {
      dispatch(alphabeticalOrder("desc"));
    }
  };

  const handlePopulationOrderChange = (event) => {
    const selectedOrder = event.target.value;
    if (selectedOrder === "Ascendant") {
      dispatch(populationOrder("asc"));
    } else if (selectedOrder === "Decrescent") {
      dispatch(populationOrder("desc"));
    }
  };

  const handleContinentChange = (event) => {
    const selectedContinent = event.target.value;
    setContinent(selectedContinent);

    dispatch(continentFilter(selectedContinent));
  };

  const handleActivityChange = (event) => {
    const selectedActivity = event.target.value;
    setSelectedActivity(selectedActivity);
    dispatch(activityFilter(selectedActivity));
  };

  return (
    <div className="all-options">
      <div className="order-box">
        <select value={order} onChange={handleAlfOrderChange}>
          <option>Alphabetical Order</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>

        <select value={order} onChange={handlePopulationOrderChange}>
          <option>Population Order</option>
          <option>Ascendant</option>
          <option>Decrescent</option>
        </select>

        <select value={continent} onChange={handleContinentChange}>
          <option>Continent Filter</option>
          <option>Africa</option>
          <option>Antartica</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>North America</option>
          <option>Oceania</option>
          <option>South America</option>
        </select>

        <select value={selectedActivity} onChange={handleActivityChange}>
          <option>Activity Filter</option>
          {activities &&
            activities.map((activity, key) => (
              <option key={key} value={activity}>
                {activity}
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
