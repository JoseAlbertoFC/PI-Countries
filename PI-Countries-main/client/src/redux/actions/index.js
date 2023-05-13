import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";

export function getCountries() {
  return async function (dispatch) {
    const response = await axios("https://restcountries.com/v3/all");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: response.data,
    });
  };
}
