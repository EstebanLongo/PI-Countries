const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db.js");

router.get('/', async (req, res)=> {
  try{
    const activityDb = await Activity.findAll({
      attributes: ['name'],
      include: Country
    })
    res.status(200).send(activityDb)
  } catch (error){
    console.log(error)
  }
})

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
    res.status(200).send("Actividad creada");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;