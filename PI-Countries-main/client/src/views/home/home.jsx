import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getCountriesByName } from "../../redux/actions";
import React from "react";
import Navbar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const [searchString, setSearchString] = useState("")

  function handleChange(event) {
    event.preventDefault();
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getCountriesByName(searchString))
  } 

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="home">
      <h2 className="home-title">Fun with Flags!</h2>
      <Navbar handleChange = {handleChange} handleSubmit = {handleSubmit}/>
      <Cards allCountries={allCountries} />
    </div>
  );
}

export default Home;
