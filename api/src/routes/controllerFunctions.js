const axios = require("axios");
const { Country, Activity } = require("../db.js");

const getInfoApi = async () => {
  const api = await axios.get("https://restcountries.com/v3/all");
  //en .data trae la info
  const apiData = await api.data.map((el) => {
    Country.findOrCreate({
      where: {
        cca3: el.cca3,
        name: el.name["common"],
        flag: el.flags[0],
        continent: el.continents[0],
        capital: el.capital ? el.capital[0] : "The country has no capital",
        subregion: el.subregion ? el.subregion : "Undefined Subregion",
        area: el.area,
        population: el.population,
      },
    });
  });
  //console.log('API DATA: ', apiData);
};

const getDbInfo = async () => {
  await getInfoApi();
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "season", "duration", "difficulty"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = {
  getInfoApi,
  getDbInfo,
};
