import React from "react";
import { postActivity } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./form.css";

const validateNamesRegex = /^[a-zA-Z\s,]+$/;
const validateDifficultyRegex = /^[1-5]$/;
const validateTimeRegex = /^(?:[1-9]|1[0-9]|2[0-4])$/;

function Form() {
  const [data, setData] = useState({
    name: "",
    season: "",
    difficulty: "",
    duration: "",
    countries: [],
  });

  const dispatch = useDispatch();

  function handleChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }
  // const validateNames = (str) => {
  //   return validateNamesRegex.test(str)
  // }

  // const validateSeason = (str) => {
  //   if(str === "Summer" || str === "Winter" || str === "Spring" || str ==="Autumn"){
  //     return str
  //   }
  // }

  // const ValidateDifficulty = (str) => {
  //   return validateDifficultyRegex.test(str)
  // }

  // const validateDuration = (str) => {
  //   return validateTimeRegex.test(str)
  // }

  // const validateCountires = (str) => {
  //   return validateNamesRegex.test(str)
  // }

  // const [error, setError] = useState({
  //   name: "",
  //   season: "",
  //   difficulty: "",
  //   duration: "",
  //   countries: "",
  // });

  // const validate = (input) => {
  //   if (/^[a-zA-Z ]+$/.test(input.name)) {
  //     setError({ ...error, name: "" });
  //   } else {
  //     setError({ ...error, name: "Formato invalido." });
  //   }
  // };

  //   validate({
  //     ...data,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  function handleSubmit(event) {
    event.preventDefault();

    const { name, season, difficulty, duration, countries } = data;

    const validateNames = (str) => {
      return validateNamesRegex.test(str);
    };

    const validateSeason = (str) => {
      if (
        str === "Summer" ||
        str === "Winter" ||
        str === "Spring" ||
        str === "Autumn"
      ) {
        return str;
      }
    };

    const ValidateDifficulty = (str) => {
      return validateDifficultyRegex.test(str);
    };

    const validateDuration = (str) => {
      return validateTimeRegex.test(str);
    };

    const validateCountires = (str) => {
      return validateNamesRegex.test(str);
    };
    // Validar los campos utilizando las funciones de validación
    const isNameValid = validateNames(name);
    const isSeasonValid = validateSeason(season);
    const isDifficultyValid = ValidateDifficulty(difficulty);
    const isDurationValid = validateDuration(duration);
    const isCountriesValid = validateCountires(countries);

    // Verificar si todos los campos son válidos
    if (
      isNameValid &&
      isSeasonValid &&
      isDifficultyValid &&
      isDurationValid &&
      isCountriesValid
    ) {
      // Crear un objeto con los datos validados
      const validatedData = {
        name,
        season,
        difficulty,
        duration,
        countries,
      };

      // Enviar los datos a la base de datos utilizando la función de Redux
      dispatch(postActivity(validatedData));
    } else {
      throw new Error({ error: "Campo invalido o incompleto." })
      // Mostrar un mensaje de error o realizar alguna acción en caso de campos inválidos
    }
  }

  return (
    <div className="form-container">
    <form className="form-box" onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input name="name" velue={data.value} onChange={handleChange} />
        <span>{}</span>
      </div>

      <div>
        <label>Season</label>
        <input name="season" velue={data.value} onChange={handleChange} />
      </div>

      <div>
        <label>Difficulty</label>
        <input name="difficulty" velue={data.value} onChange={handleChange} />
      </div>

      <div>
        <label>Duration</label>
        <input name="duration" velue={data.value} onChange={handleChange} />
      </div>

      <div>
        <label>Countries</label>
        <input name="countries" velue={data.value} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default Form;
