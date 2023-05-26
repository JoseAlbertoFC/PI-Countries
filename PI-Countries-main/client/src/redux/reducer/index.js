import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_ID,
  POST_ACTIVITY,
  ALPHABETICAL_ORDER,
  POPULATION_ORDER,
  CONTINENT_FILTER,
  ACTIVITY_FILTER,
  GET_ACTIVITIES,
} from "../actions";

let initialState = {
  allCountries: [],
  country: [],
  post: [],
  Activities: [],
  alphabeticalSort: "",
  populationSort: "",
  filterByContinent: "",
  filterByActivity: "",
};

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
        country: action.payload,
      };

    case POST_ACTIVITY:
      return {
        ...state,
        post: [...state.post, action.payload],
      };

    case ALPHABETICAL_ORDER:
      return {
        ...state,
        alphabeticalSort: action.payload,
      };

    case POPULATION_ORDER:
      return {
        ...state,
        populationSort: action.payload,
      };

    case CONTINENT_FILTER:
      return {
        ...state,
        filterByContinent: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        Activities: action.payload,
      };

    case ACTIVITY_FILTER:
      return {
        ...state,
        filterByActivity: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
