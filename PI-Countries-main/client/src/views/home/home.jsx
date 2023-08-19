import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getCountriesByName } from "../../redux/actions";
import React from "react";
import Cards from "../../components/cards/cards";
import Pagination from "../../components/pagination/pagination";
import SearchBar from "../../components/searchBar/searchBar";
import "./home.css";

function Home() {
  const dispatch = useDispatch();   //...Utilizamos el useDispatch para poder despachar actions a redux y el useSelector para acceder al estado.
  const {
    alphabeticalSort,               //...Con el useSelector obtenemos los estados que vamos a necesitar en el componente.
    populationSort,
    filterByContinent,
    filterByActivity,
    allCountries,
  } = useSelector((state) => ({
    alphabeticalSort: state.alphabeticalSort,
    populationSort: state.populationSort,
    filterByContinent: state.filterByContinent,
    filterByActivity: state.filterByActivity,
    allCountries: state.allCountries,
  }));
  const [searchString, setSearchString] = useState("");     //...Definimos para almacenar el valor del campo de busqueda.
  const [dataToRender, setDataToRender] = useState([]);     //...Definimos para almacenar los datos a mostrar en la pagina actual.
  const [currentPage, setCurrentPage] = useState(1);        //...Definimos para realizar seguimiento a la pagina actual.
  const itemsPerPage = 10;                                  //...Definimos los items/cards por pagina.

  useEffect(() => {                              //...Utilizamos un useEffect para traer y mostrar todos los paises apenas 
    dispatch(getCountries());                    //...se monta el componente "home" con la action getCountries.
  }, [dispatch]);

  function handleChange(event) {                 //...Utilizamos un handleChange para manejar los cambios en la barrita de busqueda
    event.preventDefault();                      //...actualizando la funcion searchString.
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {                 //...Utilizamos un handleSubmit para manejar el dispatch de la action getCountriesByName
    event.preventDefault();                      //...actualizando la funcion searchString.
    dispatch(getCountriesByName(searchString));
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {          //...Utilizamos un handlePageChange que se ejecuta cuando cambiamos de pagina, recibiendo
    setCurrentPage(page);                       //...un numero de pagina por parametro con el cual actualiza la funcion currentPage.
  };                                           

  useEffect(() => {                      //...Utilizamos otro useEffect para que cuando se monte el componente pase lo siguiente:
    let data = [...allCountries];        //...Se declara una variable data la cual va a ser una copia del array de allCountries.

    if (alphabeticalSort === "asc") {                         //...Si alphabeticalSort es "acs" o "desc" el array "data" se
      data.sort((a, b) => a.name.localeCompare(b.name));      //...ordenara alfabeticamente
    } else if (alphabeticalSort === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (populationSort === "asc") {                           //...Si populationSort es "acs" o "desc" el array "data" se
      data.sort((a, b) => a.population - b.population);       //...ordenara por orden de poblacion.
    } else if (populationSort === "desc") {
      data.sort((a, b) => b.population - a.population);
    }

    if (filterByContinent) {                                  //...Si filterByContinent tiene un valor, se filtrara el array "data", 
      data = data.filter((country) => country.continent === filterByContinent);   //...mostrara solo los paises pertenecientes
      setCurrentPage(1);                                      //...al continente seleccionado y te llevara a la pagina 1.
    }

    if (filterByActivity) {                                  //...Si filterByActivity tiene un valor, se filtraraa el array "data", 
      data = data.filter((country) =>                        //...mostrara solo los paises que contengan la actividad seleccionada
        country.Activities.some((act) => act.name === filterByActivity)     //...y te llevara a la pagina 1.
      );
      setCurrentPage(1);
    }

    setDataToRender(data);      //...Actualizamos el estado de dataToRender con la data ya filtrada y ordenada.
  }, [
    alphabeticalSort,
    populationSort,
    filterByContinent,
    filterByActivity,
    allCountries,
  ]);

  const filteredTotalItems = dataToRender.length;               //...Calculamos el total de elementos filtrados.
  const filteredTotalPages = Math.ceil(filteredTotalItems / itemsPerPage); //...Calculamos el numero total de paginas en funcion de la cantidad de elementos por pagina.
  const startIndex = (currentPage - 1) * itemsPerPage;               //...Calcula los índices de inicio y fin para obtener la 
  const endIndex = startIndex + itemsPerPage;                        //...porción de elementos que se mostrarán en la página actual.
  const currentCountries = dataToRender.slice(startIndex, endIndex);  //...Obtiene la porción actual de países a partir del estado dataToRender utilizando los índices calculados.

  return (
    <div className="home">
      <h2 className="home-title">Fun with Flags!</h2>
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        totalPages={filteredTotalPages}
      />
      <Cards allCountries={currentCountries} />
      <Pagination
        className="pagination"
        totalItems={filteredTotalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
