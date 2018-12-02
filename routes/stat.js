var express = require('express');
var router = express.Router();
var statModel = require("../models/stat");

/* GET users listing. */
router.get('/stat/:id', function(req, res) {
    statModel
        .findById(req.params.id)
        .then(res.json);
});

router.post('/stat', function(req, res) {
    statModel.create({
        lat: req.body.lat,
        long: req.body.long,
        accuracy: req.body.accuracy,
        acceleration: req.body.acceleration,
        signal_strength: req.body.signal_strength,
        is_driving: req.body.is_driving
    }).then(res.json);
});


module.exports = router;
