var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var GameSchema = new Schema({
    lat : Number,
    long : Number,
    accuracy : Number,
    acceleration : Number,
    signal_strength : Number,
    is_driving : Boolean
});
module.exports = mongoose.model('Games', GameSchema);