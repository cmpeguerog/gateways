const isEmpty = require("../utils/is-empty");
const express = require('express');
const router = express.Router();
const { Peripheral, Gateway } = require("../model/Models");
const validator = require("ip-validator");

function validate(gateway) {
    if (!validator.ip(gateway?.address) ) {
        throw Error("Invalid ip address.");
    }

    if (gateway?.peripherals?.length > 10) {
        throw Error("No more than 10 peripherals are allowed.");
    }

    return gateway;
}

// Get all the Gateways
router.get('/', async function(req, res, next) {
    try {
        const name = req.query.name
        const result = await Gateway.find({name: {$regex: name, $options: "i"}})
          .populate("peripherals")
        ;
        res.json({
            status: 200,
            data: result.map(({ _id, _v, peripherals, name, address }) => ({
                serial: _id,
                name,
                peripherals,
                address
            }))
        });
    } catch (exception) {
        res.json({ status: 500, message: exception })
    }
});

router.put("/:id", async function(req, res, next) {
    try {
        const peripheral = await Peripheral.findById(req.body.peripheral);
        const value = await Gateway.findById(req.params.id);

        if (value.peripherals?.length < 10) {
            await Gateway.findOneAndUpdate({
                _id: req.params.id,
            }, {
                "$addToSet": {
                    peripherals: peripheral
                }
            }, { useFindAndModify: true })

            const result = await Gateway.findById(req.params.id);
            res.json({ status: 200, data: result });
        } else {
            res.json({ status: 200, data: value });
        }
    } catch (exception) {
        console.error(exception)
        res.json({ status: 500, message: exception?.message });
    }
})

router.delete("/:id", async function(req, res, next) {
    try {
        if (isEmpty(req.query.peripheral)) {
            const result = await Gateway.remove({ _id: req.params.id })
            res.json({ status: 200, data: result });
        } else {
            const peripheral = await Peripheral.findById(req.query.peripheral);
            const value = await Gateway.findById(req.params.id);

            if (value.peripherals?.length > 0) {
                await Gateway.findOneAndUpdate({
                    _id: req.params.id,
                }, {
                    "$pullAll": {
                        peripherals: [peripheral]
                    }
                }, { useFindAndModify: true })

                const result = await Gateway.findById(req.params.id);
                console.log(result);
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 200, data: value });
            }
        }
    } catch (exception) {
        console.error(exception)
        res.json({ status: 500, message: exception?.message });
    }
})

// Add new Gateway to the DB.
router.post('/', async function (req, res , next) {
    try {
        const body = req.body
        validate(req.body);
        const gateway = new Gateway({
            name: body?.name,
            address: body?.address,
            peripherals: body?.peripherals
        })
        const result = await gateway.save()
        res.json({ status: 200, data: result })
    } catch (err) {
        res.json({ status: 500, message: err?.message });
    }
})

router.get("/:id", async function (req, res, next) {
    try {
        console.log(req.params.id);
        const result = await Gateway.findById(req.params.id)
        res.json({ status: 200, data: result })
    } catch (exception) {
        res.json({ status: 500, message: exception?.message })
    }
})

module.exports = router;
