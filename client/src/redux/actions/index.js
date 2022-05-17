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
  // console.log(payload);
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

export function filterByContinent(payload) {
  // console.log(payload);
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}

export function getNameCountry(name) {
  return async function (dispatch) {
    try {
      let countryName = await axios.get(
        "http://localhost:3001/countries?name=" + name
      );
      return dispatch({
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
}

export function setStateDetail() {
  return {
    type: "SET_DETAIL",
  };
}

export function createActivity(payload) {
  return async function (dispatch) {
    const response = axios.post("http://localhost:3001/activity", payload);
    // console.log('crear actividad: ', response);
    return dispatch({
      type: "POST_ACTIVITY",
      payload: response.data
    });
  };
}

export function getActivities() {
  return async function (dispatch) {
    let info = await axios("http://localhost:3001/activities", {});
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: info.data,
    });
  };
}
