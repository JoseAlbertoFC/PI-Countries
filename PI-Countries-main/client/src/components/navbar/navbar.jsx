import React from "react";
import "./navbar.css";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className="search-box">
      <form>
        <input placeholder="Search" type = "search" onChange = {(event) => handleChange(event)}/>
        <button onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
}

export default Navbar;
