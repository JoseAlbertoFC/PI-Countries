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
  const allCountries = useSelector((state) => state.allCountries);
  const [searchString, setSearchString] = useState("")
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
    dispatch(getCountriesByName(searchString))
  } 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCountries = allCountries.slice(startIndex, endIndex);




  return (
    <div className="home">
      <h2 className="home-title">Fun with Flags!</h2>
      <SearchBar handleChange = {handleChange} handleSubmit = {handleSubmit}/>
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
