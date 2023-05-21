import React from 'react'
import image3 from "../../images/image3.jpg";
import "./extras.css";

function Extras() {
  return (
    <div className='extra-container'>
        <img className="extra" src = {image3} alt=""/>
        <div className="text-overlay">
        <h1>BAZINGA!</h1>
        <p>You cannot see them here.</p>
      </div>
    </div>
  )
}

export default Extras