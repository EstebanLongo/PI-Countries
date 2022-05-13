const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db.js");

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  const nuevaActivity = { name, difficulty, duration, season };

  try {
    const newActivity = await Activity.create(nuevaActivity);
    const countriesMatch = await Country.findAll({
      where: {
        name: countries,
      },
    });
    await newActivity.addCountry(countriesMatch);
    res.status(200).send("Actividad creada");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;