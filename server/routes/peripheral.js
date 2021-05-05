const getRandomInt = require("../utils/getRandomInt")
const express = require('express');
const router = express.Router();
const { Peripheral } = require("../model/Models")

const vendors = [
  "Samsung",
  "Qualcomm",
  "Sony",
  "Xiaomi",
  "Apple",
  "Oppo",
  "Other"
];

router.get("/", async function (req, res , next) {
  try {
    const { uid = "", pageSize = "20" } = req.query;
    const result = await Peripheral.aggregate([
      {$addFields: {str: {$toString: '$uid'}}},
      {$match: {str: new RegExp(uid)}},
    ]).limit(parseInt(pageSize))
    res.status(200).json({ status: 200, data: result.map(({str, ...other}) => other) });
  } catch (exception) {
    res.status(500).send({message: exception.message});
  }
});

router.post("/", async function(req, res, next) {
  try {
    const uid = Math.floor(Date.now());
    const vendor = vendors[getRandomInt(0, vendors.length - 1)];
    const status = (getRandomInt(1, 1000) % 2 === 0);
    const peripheral = new Peripheral({
      uid,
      vendor,
      status
    })
    const result = await peripheral.save()
    res.status(200).json({ status: 200, data: result });
  } catch (exception) {
    res.status(500).send({message: exception.message});
  }
})

module.exports = router;