import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getCountriesByName } from "../../redux/actions";
import React from "react";
import Cards from "../../components/cards/cards";
import Pagination from "../../components/pagination/pagination";
import SearchBar from "../../components/searchBar/searchBar";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const {
    alphabeticalSort,
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
  const [searchString, setSearchString] = useState("");
  const [dataToRender, setDataToRender] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(event) {
    event.preventDefault();
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getCountriesByName(searchString));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    let data = [...allCountries];

    if (alphabeticalSort === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (alphabeticalSort === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (populationSort === "asc") {
      data.sort((a, b) => a.population - b.population);
    } else if (populationSort === "desc") {
      data.sort((a, b) => b.population - a.population);
    }

    if (filterByContinent) {
      data = data.filter((country) => country.continent === filterByContinent);
    }

    if (filterByActivity) {
      data = data.filter((country) =>
        country.Activities.some((act) => act.name === filterByActivity)
      );
    }

    setDataToRender(data);
  }, [
    alphabeticalSort,
    populationSort,
    filterByContinent,
    filterByActivity,
    allCountries,
  ]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCountries = dataToRender.slice(startIndex, endIndex);

  return (
    <div className="home">
      <h2 className="home-title">Fun with Flags!</h2>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allCountries={currentCountries} />
      <Pagination
        className="pagination"
        totalItems={allCountries.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
