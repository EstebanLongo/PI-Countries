const axios = require("axios");
const { Country } = require('../db.js')

const getInfoApi = async () => {
  const api = await axios.get("https://restcountries.com/v3/all");
  const apiData = await api.data.map((el) => {
    return {
      name: el.name.common,
      official: el.name.official,
      cca3: el.cca3,
      continents: el.continents,
      capital: el.capital,
      subregion: el.subregion,
      map: el.map,
      flag: el.flag,
      population: el.population,
      area: el.area,
    };
  });
  return apiData;
};

const getDbInfo = async () => {
  return await Country.findAll({
    include: {
      model: country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllCountries = async () => {
  const apiData = await getInfoApi();
  const dbData = await getDbInfo();
  const infoTotal = apiData.concat(dbData);
  return infoTotal;
};

module.exports = {
    getInfoApi,
    getDbInfo,
    getAllCountries
}