import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card({ country }) {                              //...Recibimos por props el objeto "country" ya destructurado
  const { id, name, image, continent } = country;         //...y extraemos la informacion que necesitamos.
                                                          
  return (
    <div className="card-container">                      
      <Link to={`/home/${id}`}>
        <img
          src={image}
          alt={"No fue posible cargar imagen."}
          className="mainImage"
        />
      </Link>
      <h2>{name}</h2>
      <p>{continent}</p>
    </div>
  );
}

export default Card;

//...Renderizamos el componente "card" con toda la informacion que optenemos de 
//...nuestro back y linkeamos nuestra image para poder acceder al detail y  
//...evitar linkear toda la card, para que no aparezcan esas letras azules feas.