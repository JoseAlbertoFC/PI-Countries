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

let initialState = { allCountries: [], post: [], Activities: [] };

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

    case POST_ACTIVITY:
      return {
        ...state,
        post: [...state.post, action.payload],
      };

    case ALPHABETICAL_ORDER:
      const { payload: order } = action;
      let sortedCountries;

      if (order === "asc") {
        sortedCountries = [...state.allCountries].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (order === "desc") {
        sortedCountries = [...state.allCountries].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else {
        sortedCountries = state.allCountries;
      }
      return {
        ...state,
        allCountries: sortedCountries,
      };

    case POPULATION_ORDER:
      const { payload: popOrder } = action;
      let popSortedCountries;

      if (popOrder === "asc") {
        popSortedCountries = [...state.allCountries].sort(
          (a, b) => a.population - b.population
        );
      } else if (popOrder === "desc") {
        popSortedCountries = [...state.allCountries].sort(
          (a, b) => b.population - a.population
        );
      } else {
        popSortedCountries = state.allCountries;
      }

      return {
        ...state,
        allCountries: popSortedCountries,
      };

    case CONTINENT_FILTER:
      const { payload: selectedContinent } = action;
      let continentFilteredCountries;

      if (selectedContinent === "") {
        continentFilteredCountries = state.allCountries;
      } else {
        continentFilteredCountries = state.allCountries.filter(
          (country) => country.continent === selectedContinent
        );
      }

      return {
        ...state,
        allCountries: continentFilteredCountries,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        Activities: action.payload,
      };

    case ACTIVITY_FILTER:
      const filtered =
        action.payload === "Activity Filter"
          ? state.allCountries
          : state.allCountries.filter((country) =>
              country.Activities.some((act) => act.name === action.payload)
            );

      return {
        ...state,
        allCountries: filtered,
      };

    default:
      return state;
  }
}

export default rootReducer;
