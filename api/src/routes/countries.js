const { Router } = require("express");
const { Country, Activity } = require("../db.js");
const { getAllCountries } = require("./controllerFunctions.js");
const router = Router();

// router.get('/', async (req, res, next) => {
//     const name = req.query.name
//     let countriesTotal = await getAllCountries();
//     if (name) {
//         let countryName = await countriesTotal.filter( el => el.name.toLowerCase().inclues(name.toLowerCase()))
//         countryName.length ?
//         res.status(200).send(countryName) :
//         res.status(404).send('No esta el pais')
//     } else {
//         res.status(200).send(countriesTotal)
//     }
// })

// router.get("/", async (req, res, next) => {
//   const db = await Country.findAll({
//     include: {
//       model: Activity,
//     },
//   });

//   const name = req.query.name;

//   if (name) {
//     let dataQuery = db.filter((e) =>
//       e.dataValues.name.toLowerCase().includes(name.toLowerCase())
//     );
//     return dataQuery.length ? res.json(dataQuery) : res.sendStatus(404);
//   } else {
//     res.send(db);
//   }
// });
router.get("/", async (req, res) => {
    const db = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    // query filter
    const name = req.query.name;
    // query filter
  
    if (name) {
      let dataQuery = db.filter((e) =>
        e.dataValues.name.toLowerCase().includes(name.toLowerCase())
      );
      return dataQuery.length ? res.json(dataQuery) : res.sendStatus(404);
    } else {
      res.send(db);
    }
  });

router.post("/", (req, res, next) => {
  res.send("soy post /countries");
});

module.exports = router;
