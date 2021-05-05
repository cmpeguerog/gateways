const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const Peripheral = Schema({
  uid: Number,
  vendor: String,
  "date_created": { type: Date, default: Date.now() },
  status: { type: Boolean, default: true }
});

const Gateway = Schema({
  name: String,
  address: String,
  peripherals: [{
    type: Schema.Types.ObjectId, ref: "Peripheral"
  }]
})

module.exports = {
  Peripheral: mongoose.model("Peripheral", Peripheral),
  Gateway: mongoose.model("Gateway", Gateway)
};
