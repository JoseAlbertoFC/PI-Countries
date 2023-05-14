import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_ID,
} from "../actions";

let initialState = { allCountries: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
      };

    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        allCountries: [...action.payload],
      };

    case GET_COUNTRIES_BY_ID:
      return {
        ...state,
        allCountries: [...action.payload],
      };

    default:
      return state;
  }
}

export default rootReducer;
