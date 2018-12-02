var express = require('express');
var router = express.Router();
var statModel = require("../models/stat");

/* GET users listing. */
router.get('/:id', function(req, res) {
    statModel
        .findById(req.params.id)
        .then((stat) => {
            return res.send(stat);
        });
});

router.post('/', function(req, res) {
    const stat = new statModel({
        lat: req.body.lat,
        long: req.body.long,
        accuracy: req.body.accuracy,
        acceleration: req.body.acceleration,
        signal_strength: req.body.signal_strength,
        is_driving: req.body.is_driving
    });

    stat
        .save()
        .then(() => {
            console.log('stat', stat);
            return res.send(stat);
        }, (e) => {
        console.log('e', e);
            var err = new Error();
            err.status = 400;
            return res.end(err);
    });
});


module.exports = router;
