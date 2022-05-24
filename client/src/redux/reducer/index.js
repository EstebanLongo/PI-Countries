const initialState = {
  countries: [],
  countriesCopy: [],
  activities: [],
  countryDetail: {},
  delete: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        countriesCopy: action.payload,
      };

    case "SEARCH_COUNTRY_NAME":
      return {
        ...state,
        countries: action.payload,
      };

    case "ORDER_BY_POPULATION":
      if (action.payload === "All") {
        return {
          ...state,
          countries: state.countriesCopy,
        };
      }
      let orderByPp =
        action.payload === "asc"
          ? state.countries.sort((a, b) => a.population - b.population)
          : state.countries.sort((a, b) => {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        countries: orderByPp,
      };

    // case "ORDER_BY_NAME":
    //   const orderByName =
    //     action.payload === "az"
    //       ? state.countriesCopy.sort((a, b) => a.name.localeCompare(b.name))
    //       : state.countriesCopy.sort((a, b) => b.name.localeCompare(a.name));
    //   return {
    //     ...state,
    //     countries: orderByName,
    //   };

    case "ORDER_BY_NAME":
      if (action.payload === "All") {
        return {
          ...state,
          countries: state.countriesCopy,
        };
      }

      let orderByNm =
        action.payload === "az"
          ? state.countries.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        countries: orderByNm,
      };

    case "FILTER_BY_CONTINENT":
      const continents = state.countriesCopy;
      const continentFiltered =
        action.payload === "All"
          ? continents
          : continents.filter((el) => el.continent === action.payload);
      return {
        ...state,
        countries: continentFiltered,
      };

    case "FILTER_ACTIVITIES":
      const filterByAct = state.countriesCopy;
      let actFiltered =
        action.payload === "All"
          ? filterByAct
          : filterByAct.filter((a) =>
              a.activities.map((a) => a.name).includes(action.payload)
            );
      console.log("ACT: ", actFiltered);
      return {
        ...state,
        countries: actFiltered,
      };

    case "GET_DETAIL":
      return {
        ...state,
        countryDetail: action.payload,
      };

    case "POST_ACTIVITY":
      return {
        ...state,
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };

    case "DETELE_ACTIVITY":
      return {
        ...state,
      };

    case "SET_STATE_DETAIL":
      return {
        ...state,
        countryDetail: {},
      };

    default:
      return {
        ...state,
        countryDetail: {},
      };
  }
}

export default rootReducer;
