const axios = require("axios");
const { Activity, Country } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async () => {
  const dbCountries = await Country.findAll({
    include: [Activity],
  });

  try {
    if (dbCountries.length === 0) {
      const apiUrl = await axios("https://restcountries.com/v3/all");
      const apiInfo = await apiUrl.data.map((element) => {
        return {
          id: element.cca3,
          name: element.name.common,
          image: element.flags[1],
          continent: element.continents?.[0] || "Information not available.",
          capital: element.capital?.[0] || "Information not available.",
          subRegion: element.subregion || "Information not available.",
          area: element.area,
          population: element.population,
        };
      });

      for (const country of apiInfo) {
        await Country.findOrCreate({
          where: { id: country.id },
          defaults: {
            id: country.id,
            name: country.name,
            image: country.image,
            continent: country.continent,
            capital: country.capital,
            subRegion: country.subRegion,
            area: country.area,
            population: country.population,
          },
        });
      }

      const updatedCountries = await Country.findAll({
        include: [Activity],
      });
      return updatedCountries;
    }

    return dbCountries;
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
};

//--------------------------------------------------------------------

const countriesByName = async (name) => {
  try {
    const result = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Activity],
    });
    return result;
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
};

//--------------------------------------------------------------------

const countryDetail = async (id) => {
  try {
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
