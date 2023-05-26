import React from 'react';
import "./pagination.css";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {  //...Calculamos el total de paginas dividiendo el total  
  const totalPages = Math.ceil(totalItems / itemsPerPage);          //...de items entre los items por pagina y redondeamos hacia arriba.
                                                            
  const handlePageChange = (page) => {     //...Creamos la funcion handlePageChange la cual se va a ejecutar cuando
    onPageChange(page);                    //...se haga click en un numero de pagina llamando a la funcion onPageChange yx
  };                                       //...pasandole el umero de pagina.

  const renderPageNumbers = () => {     //...Creamos la funcion renderPageNumbers la cual va a crear un array de botones que van
    const pageNumbers = [];             //...a ser el numero de paginas.

    for (let i = 1; i <= totalPages; i++) {  //...Utilizamos un bucle for para iterar en ese array desde el 1 hasta totalPages.
      pageNumbers.push(                      //...para cada numero de pagina se crea un boton el cual va a tener un onClick que va a llamar a
        <button                              //...la funcion handlePageChange con el numero de pagina correspondiente y si este coincide
          key={i}                            //...con currentPage se le agrega la clase active de css para resaltarlo. 
          onClick={() => handlePageChange(i)}  
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const handlePrevPage = () => {    //...Se define la funcion handlePrevChange que se ejecuta cuando hacemos click en el boton prev
    if (currentPage > 1) {          //...si currentPage es mayor que 1, se llama a handlePageChange con el número de página anterior (currentPage - 1).
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {      //...Se define la funcion handleNextChange que hace lo mismo que la funcion anterior pero con el botn next
    if (currentPage < totalPages) {   //...solo que esta vez compara la currentPage con totalPages, si la currentPage es menor a totalPages
      handlePageChange(currentPage + 1);  //...se llama a handlePageChange con el número de página siguiente (currentPage + 1).
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      {renderPageNumbers()}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;

//...En la renderizacion agregamos la propiedad disabled a los botones "prev" y "next"
//...en caso de que se cumpla cierta condicion; que currentPage sea igual a la primera pagina 
//...y  en caso de que currentPage sea igual al total de paginas.