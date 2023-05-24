const {
  getAllActivities,
  postCountryActivity,
  deleteActivityByName,
} = require("../controllers/Activities");

const postActivity = async (req, res) => {
  const { name, season, difficulty, duration, countries } = req.body;

  try {
    const result = await postCountryActivity(
      name,
      season,
      difficulty,
      duration,
      countries
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//-------------------------------------------------------------------

const getActivities = async (req, res) => {
  try {
    const result = await getAllActivities();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//.........................Extra Credits.............................

const deleteActivity = async (req, res) => {
  const { name } = req.query;

  try {
    const result = await deleteActivityByName(name);
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postActivity,
  getActivities,
  deleteActivity,
};
