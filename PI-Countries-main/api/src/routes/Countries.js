const { Router } = require ("express");
const { getCountries, getCountryById } = require ("../handlers/Countries")

const countriesRoutes = Router();

countriesRoutes.get("/", getCountries);
countriesRoutes.get("/:id", getCountryById);


module.exports = countriesRoutes;
