const { Router } = require("express");
const { getDbInfo } = require("./controllerFunctions.js");
const router = Router();

router.get("/", async (req, res) => {
  let { name } = req.query;
  if (!name) {
    let allCountries = await getDbInfo();
    res.status(200).send(allCountries);
    //console.log(allCountries);
  } else {
    try {
      let country = await getDbInfo();
      let countryName = country.filter((el) =>
        el.name.toLowerCase().startsWith(name.toLowerCase())
      );
      countryName.length
        ? res.status(200).send(countryName)
        : res.status(404).send("Country not found");
    } catch (error) {
      res.send(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let dbInfo = await getDbInfo();
    let countryId = dbInfo.filter((el) =>
      el.cca3.toUpperCase().startsWith(id.toUpperCase())
    );
    countryId
      ? res.status(200).send(countryId)
      : res.status(404).send("Country not found");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
