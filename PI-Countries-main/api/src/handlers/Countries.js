const { getAllCountries, countriesByName, countryDetail} = require("../controllers/Countries");

const getCountries = async (req, res) => {
  const { name } = req.query;

  try {
    const result = name ? await countriesByName(name) : await getAllCountries();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//--------------------------------------------------------------------

const getCountryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await countryDetail(id.toUpperCase());
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountries,
  getCountryById,
};
