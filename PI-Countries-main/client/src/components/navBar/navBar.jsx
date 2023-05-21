import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

function NavBar() {
  return (
    <nav className="nav-container">
      <Link to="/">
        <button>Landing</button>
      </Link>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/form">
        <button>Create Activity</button>
      </Link>
      <Link to="/extras">
        <button>Extras</button>
      </Link>
    </nav>
  );
}

export default NavBar;
