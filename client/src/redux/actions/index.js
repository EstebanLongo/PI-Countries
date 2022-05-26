const axios = require("axios");

export function getCountries() {
  return async function (dispatch) {
    let countries = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: countries.data,
    });
  };
}

export function orderAZ(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

export function filterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}
// en vez de recibir el name recibe el continent
export function getNameCountry(name) {
  return async function (dispatch) {
    try {
      let countryName = await axios.get(
        //en vez del + name iria el continent
        "http://localhost:3001/countries?name=" + name
      );
      return dispatch({
        //"SEARCH_CONTINENT_NAME"
        type: "SEARCH_COUNTRY_NAME",
        payload: countryName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get("http://localhost:3001/countries/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // return function (dispatch){
  //   axios.get("http://localhost:3001/countries/" + id)
  //   .then(response =>{
  //     dispatch({
  //       type: "GET_DETAIL",
  //       payload: response.data
  //     })
  //   })
  // }
}

export function createActivity(payload) {
  return async function (dispatch) {
    try {
      const act = await axios.post("http://localhost:3001/activities", payload);
      return act;
    } catch (error) {
      alert("Creation failed");
      console.log(error);
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    let info = await axios.get("http://localhost:3001/activities");
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: info.data,
    });
  };
}

export function deleteActivity(payload) {
  return async function (dispatch) {
    try {
      axios.delete("http://localhost:3001/activities/" + payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterActivities(payload) {
  return {
    type: "FILTER_ACTIVITIES",
    payload,
  };
}

export function setStateDetail() {
  return {
    type: "SET_DETAIL",
  };
}
