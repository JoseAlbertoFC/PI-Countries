const { Country, Activity } = require("../db");

const postCountryActivity = async (name, season, difficulty, duration, countries) => {
  try {
    const newActivity = await Activity.create({
      name: name,
      season: season,
      difficulty: difficulty,
      duration: duration,
    });

    const selectCountries = await Country.findAll({
      where: {
        name: countries,
      },
    });

    await newActivity.setCountries(selectCountries);

    const createdActivity = await Activity.findByPk(newActivity.id, {
      include: [Country],
    });

    return createdActivity;
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
};

//-------------------------------------------------------------------

const getAllActivities = async () => {
  try {
    return await Activity.findAll();
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
};

module.exports = {
  postCountryActivity,
  getAllActivities,
};
