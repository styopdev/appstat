var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var StatsSchema = new Schema({
    lat : Number,
    lng : Number,
    accuracy : Number,
    accelerationX: Number,
    accelerationY: Number,
    accelerationZ: Number,
    wifi_strength : Number,
    isDriving : Boolean
});
module.exports = mongoose.model('Stats', StatsSchema);