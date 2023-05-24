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

function SearchBar({ handleChange, handleSubmit, totalPages}) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.Activities);

  const handleAlfOrderChange = (event) => {
    const selectedOrder = event.target.value;
    if (selectedOrder === "A-Z") {
      dispatch(alphabeticalOrder("asc"));
    } else if (selectedOrder === "Z-A") {
      dispatch(alphabeticalOrder("desc"));
    } else {
      dispatch(alphabeticalOrder(""));
    }
  };

  const handlePopulationOrderChange = (event) => {
    const selectedOrder = event.target.value;
    if (selectedOrder === "Ascendant") {
      dispatch(populationOrder("asc"));
    } else if (selectedOrder === "Decrescent") {
      dispatch(populationOrder("desc"));
    } else {
      dispatch(populationOrder(""));
    }
  };

  const handleContinentChange = (event) => {
    const selectedContinent = event.target.value;
    dispatch(continentFilter(selectedContinent));
  };

  const handleActivityChange = (event) => {
    const selectedActivity = event.target.value;
    dispatch(activityFilter(selectedActivity));
  };

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

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
