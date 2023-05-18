import React from "react";
import { Link } from "react-router-dom"
import image4 from "../../images/image4.gif";
import "./landing.css";

function Landing() {
  return (
    <div className="start-container">
      <Link to = "/home" className="start-link">
      <button className="start-button">Start</button>
      </Link>
      <div className="title-container">
        <h2 className="title"> Dr. Sheldon Cooper and Dev. José Fuenmayor <br/> presents</h2>
        <h1 className="subtitle">Fun with Flags!</h1>
      </div>
      <div className="image-container">
        <img className="image" src={image4} alt="No se pudo cargar la imagen." />
      </div>
    </div>
  );
}

export default Landing;

