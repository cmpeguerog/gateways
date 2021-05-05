const getRandomInt = require("../utils/getRandomInt")
const isEmpty = require("../utils/is-empty")
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
    const { uid = "", exclusion, pageSize = "20" } = req.query;
    const result = await Peripheral.aggregate([
      {$addFields: {str: {$toString: '$uid'}}},
      {$match: {str: new RegExp(uid)}},
    ]).limit(parseInt(pageSize))
    res.json({ status: 200, data: result });
  } catch (exception) {
    res.json({ status: 500, message: exception?.message })
  }
});

router.post("/", async function(req, res, next) {
  try {
    const uid = Math.floor(Date.now() / 1000);
    const vendor = vendors[getRandomInt(0, vendors.length - 1)];
    const status = (getRandomInt(1, 1000) % 2 === 0);

    const peripheral = new Peripheral({
      uid,
      vendor,
      status
    })
    const result = await peripheral.save()
    res.json({ status: 200, data: result });
  } catch (exception) {
    res.json({ status: 500, message: exception?.message });
  }
})

module.exports = router;