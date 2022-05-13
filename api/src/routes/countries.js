const { Router } = require("express");
const { getDbInfo } = require("./controllerFunctions.js");
const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  let countryTotals = await getDbInfo();
  //console.log(countryTotals)

  if (name) {
    let countryName = await countryTotals.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    if (countryName.length) {
      return res.status(200).send(countryName);
    } else {
      return res.status(404).send("No hay pais");
    }
  }
  return res.status(200).send(countryTotals);
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
  
//   if (id) {
//     let countryTotals = await getDbInfo();
//     let country = await countryTotals.filter(
//       (el) => el.cca3.toLowerCase().startsWith(id.toLowerCase())
//     );
//       country ? res.status(200).json(country) : res.status(404).send("No such country");
//   }
// });

router.get('/:id', async (req, res)=> {
  const {id} = req.params;
  try{
    let dbInfo = await getDbInfo();
    let countryId = dbInfo.filter( el => el.cca3.toLowerCase().startsWith(id.toLowerCase()))
    countryId ?
    res.status(200).send(countryId)
    : res.status(404).send('Country not found')
  }
  catch (error) {res.send(error)}
})

module.exports = router;
