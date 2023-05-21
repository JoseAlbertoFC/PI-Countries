import React from "react";
import { postActivity } from "../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./form.css";

const validateNamesRegex = /^[a-zA-Z\s,]+$/;
const validateDifficultyRegex = /^[1-5]$/;
const validateTimeRegex = /^(?:[1-9]|1[0-9]|2[0-4])$/;

function Form() {
  const allCountries = useSelector((state) => state.allCountries);
  const [data, setData] = useState({
    name: "",
    season: "",
    difficulty: "",
    duration: "",
    countries: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    season: "",
    difficulty: "",
    duration: "",
    countries: "",
  });

  const dispatch = useDispatch();

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "countries") {
      setData((prevData) => ({
        ...prevData,
        [name]: [...prevData.countries, value],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    validate(name, value);
  }

  function validate(name, value) {
    let error = "";

    switch (name) {
      case "name":
        error = value && !validateNamesRegex.test(value) ? "👀" : "";
        break;
      case "season":
        error = value && "Seasons".includes(value) ? "👀" : "";
        break;
      case "difficulty":
        error = value && "0 Points".includes(value) ? "👀" : "";
        break;
      case "duration":
        error = value && "Hours".includes(value) ? "👀" : "";
        break;
      case "countries":
        error = value && "Select Country".includes(value) ? "👀" : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }
  function resetForm() {
    setData({
      name: "",
      season: "",
      difficulty: "",
      duration: "",
      countries: [],
    });

    setErrors({
      name: "",
      season: "",
      difficulty: "",
      duration: "",
      countries: "",
    });
  }

  function handleClose(countryToRemove) {
    const filteredArray = data.countries.filter(
      (country) => country !== countryToRemove
    );
    setData((previousData) => ({
      ...previousData,
      countries: filteredArray,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { name, season, difficulty, duration, countries } = data;

    if (
      validateNamesRegex.test(name) &&
      ["Summer", "Winter", "Spring", "Autumn"].includes(season) &&
      validateDifficultyRegex.test(difficulty) &&
      validateTimeRegex.test(duration) &&
      countries.length
    ) {
      countries.forEach((country) => {
        dispatch(
          postActivity({
            ...data,
            countries: country,
          })
        );
      });
      alert("Activity Created Successfully!");
      resetForm();
    } else {
      alert("Something's Wrong");
    }
  }

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <div>
          <label>Activity</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            onInvalid={handleChange}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div>
          <label>Season</label>
          <select
            name="season"
            value={data.season}
            onChange={handleChange}
            required
          >
            <option>Seasons</option>
            <option>Autumn</option>
            <option>Spring</option>
            <option>Summer</option>
            <option>Winter</option>
          </select>
          {errors.season && (
            <span className="error-message">{errors.season}</span>
          )}
        </div>

        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={data.difficulty}
            onChange={handleChange}
          >
            <option>Points</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          {errors.difficulty && (
            <span className="error-message">{errors.difficulty}</span>
          )}
        </div>

        <div>
          <label>Duration</label>
          <select
            name="duration"
            value={data.duration}
            onChange={handleChange}
          >
            <option>Hours</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
          </select>
          {errors.duration && (
            <span className="error-message">{errors.duration}</span>
          )}
        </div>

        <div>
          <label>Countries</label>
          {console.log(allCountries)}
          <select name="countries" onChange={handleChange}>
            <option>Select Country</option>
            {allCountries.map(({ name, id }) => {
              return (
                <option value={name} key={id}>
                  {name}
                </option>
              );
            })}
          </select>


          {errors.countries && (
            <span className="error-message">{errors.countries}</span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {data.countries.map((country) => (
            <div className="selected-country-container">
              <div className="x-container" onClick={() => handleClose(country)}>
                X
              </div>
              <div className="country-text" title={country}>
                {country}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
