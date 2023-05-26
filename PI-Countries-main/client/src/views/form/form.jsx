import React from "react";
import { postActivity } from "../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./form.css";

const validateNamesRegex = /^[a-zA-Z\s,]+$/;            //...Definimos expresiones regulares para el name, difficulty y time.
const validateDifficultyRegex = /^[1-5]$/;
const validateTimeRegex = /^(?:[1-9]|1[0-9]|2[0-4])$/;

function Form() {
  const allCountries = useSelector((state) => state.allCountries);  //...Utilizamos el useSelector para obtener todos los paises de redux.
  const [data, setData] = useState({             //...Definimos el estado "data" para almacenar los valores de los campos 
    name: "",                                    //...que componen el formulario.
    season: "",
    difficulty: "",
    duration: "",
    countries: [],
  });

  const [errors, setErrors] = useState({        //...Definimos el estado "errors" para almacenar los mensajes de error de cada
    name: "",                                   //...campo del formulario.
    season: "",
    difficulty: "",
    duration: "",
    countries: "",
  });

  const dispatch = useDispatch();               //...Utilixamos el useDispatch para poder despachar action al reducer. 

  function validate(name, value) {      //...Creamos la funcion "validate" la cual valida los valores de los campos y actualiza
    let error = "";                     //...el estado de error en consecuencia

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

  function handleChange(event) {           //...Definimos la funcion handleChange la cual se ejecuta cada vez que cambia el valor
    const { name, value } = event.target;  //...de un campo en el formulario, actualiza el estado data y llama a la funcion validate

    if (name === "countries") {            //...en cada cambio
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

  function resetForm() {      //...Creamos la funcion resetForm la cual se encargara de setear los valores del form a los valores
    setData({                 //...iniciales, tanto los campos como los errores, luego del envio del mmismo. 
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

  function handleClose(countryToRemove) {         //...Se define la funcion handleClose la cual se ejecutata al eliminar alguno de los
    const filteredArray = data.countries.filter(  //...paises seleccionados, esta filtra el array de paises "data" y lo actualiza a un
      (country) => country !== countryToRemove    //...nuevo array donde no aparecen los paises que han sido eliminados.
    );
    setData((previousData) => ({
      ...previousData,
      countries: filteredArray,
    }));
  }

  function handleSubmit(event) {          //...Se define la funcion handleSubmit la cual se ejecuta al momento de hacer click en el 
    event.preventDefault();               //...boton para enviar el formulario.

    const { name, season, difficulty, duration, countries } = data;

    if (
      validateNamesRegex.test(name) &&        //...esta hace todas las validaciones correspondientes, luego se fija en el array de paises
      ["Summer", "Winter", "Spring", "Autumn"].includes(season) &&   //...seleccionados "data", lo itera y por cada pais, crea la actividad
      validateDifficultyRegex.test(difficulty) &&                    //...indicada en el formulario.
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
      alert("Activity Created Successfully!");    //...Enviamos un alert con un mensaje si sale todo bien.
      resetForm();                                //...Reseteamos el formulario.
    } else {
      alert("Something's Wrong");                 //...Y en caso de que algo salga mal, enviamos un mensaje de error.
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
          <select name="duration" value={data.duration} onChange={handleChange}>
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
