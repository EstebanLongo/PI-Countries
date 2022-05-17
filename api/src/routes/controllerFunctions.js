const axios = require("axios");
const { Country, Activity } = require("../db.js");

const getInfoApi = async () => {
  try {
    const check = await Country.findAll();
    if (check.length > 0) return console.log("Data base is ready");
    const api = await axios.get("https://restcountries.com/v3/all");
    //en .data trae la info
    await api.data.map((el) => {
      Country.findOrCreate({
        where: {
          name: el.name["common"],
          cca3: el.cca3,
          flag: el.flags[1],
          continent: el.continents[0] ? el.continents[0] : "No continent",
          capital: el.capital ? el.capital[0] : "The country has no capital",
          subregion: el.subregion ? el.subregion : "Undefined Subregion",
          area: el.area,
          population: el.population,
        },
      });
    });
  } catch (error) {
    console.log("este es el error");
    console.log(error);
  }
};

const getDbInfo = async () => {
  // await getInfoApi();
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
