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

//...El componente "navBar" nos permite navegar por toda la app,
//...en su renderizado tenemos todas las rutas con sus respectivos 
//...botones que nos llevan a las diferentes vistas de la app.
