const { Country, Activity } = require("../db");

const postCountryActivity = async (name, season, difficulty, duration, countries) => {
  try {
    const newActivity = await Activity.create({           //...Creamos una nueva actividad en la db con los datos proporcionados.
      name: name,                                         
      season: season,
      difficulty: difficulty,
      duration: duration,
    });

    const selectCountries = await Country.findAll({       //...Buscamos todos los paises en la db que cioincidan con el parametro countries
      where: {                                            //...y lo almacenamos en una variable.
        name: countries,
      },
    });

    await newActivity.setCountries(selectCountries);     //...Establecemos una relacion entre la actividad creada y los paises proporcionados.

    const createdActivity = await Activity.findByPk(newActivity.id, {       //...Luego buscamos la actividad por id en la db e incluimos el modelo
      include: [Country],                                                   //...Country para obtener la actividad con sus paises relacionados.
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

//.........................Extra Credits.............................

const deleteActivityByName = async (name) => {
  try {
    const activity = await Activity.findOne({ where: { name } });

    if (!activity) {
      throw new Error("This Activity doesn't Exist");
    }
    const activityCopy = activity
    await activity.destroy();
    alert("Activity Successfully Deleted!")
    return activityCopy;
  } catch (error) {
    throw new Error("Ups! We got a problem.");
  }
}

module.exports = {
  postCountryActivity,
  getAllActivities,
  deleteActivityByName,
};
