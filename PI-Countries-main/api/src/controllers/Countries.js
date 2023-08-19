const axios = require("axios");
const { Activity, Country } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async () => {
  const dbCountries = await Country.findAll({     //...Buscamos todos los paises en la db local
    include: [Activity],                          //...incluyendo la relacion con el modelo Activity.
  });                                             
                                                  
  try {
    if (dbCountries.length === 0) {               //...Si no hay nada en la db procedemos a buscar en la api.
      const apiUrl = await axios(
        "https://restcountries.com/v3/all"
      );
      const apiInfo = await apiUrl.data.map((element) => {
        return {
          id: element.cca3,
          name: element.name.common,
          image: element.flags[1],
          continent: element.continents?.[0] || "Information not available.",  //...En el caso de estas 3 caracteristicas, preguntamos si existen
          capital: element.capital?.[0] || "Information not available.",       //...debido a que algunos paises no las tienen o les falta alguna
          subRegion: element.subregion || "Information not available.",        //...y de no manejar correctamente la request a la api
          area: element.area,                                                  //causa que el controller no funcione correctamente o se rompa.
          population: element.population,
        };
      });

      for (const country of apiInfo) {           //...Iteramos sobre la apiInfo para buscar el pais en la db por id,
        await Country.findOrCreate({             //...si el pais no se encuentra, el findOrCreate crea un nuevo registro
          where: { id: country.id },             //...con los valores que le damos.
          defaults: {
            id: country.id,                      //...Este proceso asegura que los paises se guarden correctamente en
            name: country.name,                  //...la db local.
            image: country.image,
            continent: country.continent,
            capital: country.capital,
            subRegion: country.subRegion,
            area: country.area,
            population: country.population,
          },
        });
      }

      const updatedCountries = await Country.findAll({    //...Despues de completar la creacion, se hace una nueva consulta
        include: [Activity],                              //...a la db incluyendo el modelo Activity para obtener todos
      });                                                 //...los paises con sus respectivas actividades.
      return updatedCountries;
    }

    return dbCountries;                                   
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
};

//--------------------------------------------------------------------

const countriesByName = async (name) => {         //...Buscamos todos los paises que coincidan con el nombre que recibimos en la db local 
  try {                                           //...y con el where apuntamos a una caracteristica especifica del pais, en este caso el nombre, 
    const result = await Country.findAll({        //...luego lo hacemos insencible a la busqueda con mayusculas o minusculas.
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Activity],                        //...Incluimos el modelo Activity para que nos proporcione el pais 
    });                                           //...con su actividad correspondiente.
    return result;
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
};

//--------------------------------------------------------------------

const countryDetail = async (id) => {              //...Buscamos el pais en la db por su id e incluimos el modelo 
  try {                                            //...Activity, de esta forma obtendremos el pais con su actividad correspondiente.
    return await Country.findByPk(id, {
      include: [Activity],
    });
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
};

module.exports = {
  getAllCountries,
  countriesByName,
  countryDetail,
};
