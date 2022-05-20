const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    const activityDb = await Activity.findAll({
      attributes: ["name", "duration", "difficulty", "season"],
      include: Country,
    });
    res.status(200).send(activityDb);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  const activity = { name, difficulty, duration, season };

  try {
    const newActivity = await Activity.create(activity);
    const countriesMatch = await Country.findAll({
      where: {
        name: countries,
      },
    });
    await newActivity.addCountry(countriesMatch);
    res.status(200).send("Activity created!");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const del = await Activity.destroy({
      where: { name: name },
    });
    res.send("Activity deleted succesfully");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
