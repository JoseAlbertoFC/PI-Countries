import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER";
export const POPULATION_ORDER = "POPULATION_ORDER";
export const CONTINENT_FILTER = "CONTINENT_FILTER";
export const ACTIVITY_FILTER = "ACTIVITY_FILTER";
export const GET_ACTIVITIES = "GET_ACTIVITIES";

export function getCountries() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/countries/");
      return dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries/?name=${name}`
      );
      return dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function getCountriesById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: GET_COUNTRIES_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/activities/",
        payload
      );
      return dispatch({
        type: POST_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function alphabeticalOrder(order) {
  return {
    type: ALPHABETICAL_ORDER,
    payload: order,
  };
}

export function populationOrder(order) {
  return {
    type: POPULATION_ORDER,
    payload: order,
  };
}

export function continentFilter(continent) {
  return {
    type: CONTINENT_FILTER,
    payload: continent,
  };
}

export function activityFilter(activity) {
  return {
    type: ACTIVITY_FILTER,
    payload: activity,
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/activities/");
      return dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}
