var express = require('express');
var router = express.Router();
var statModel = require("../models/stat");
var md5 = require('md5');

const api_key = 'Qayl ara merjir serjin';


/* GET users listing. */
router.get('/:id', (req, res) => {
    statModel
        .findById(req.params.id)
        .then((stat) => {
            return res.send(stat);
        });
});

router.post('/', (req, res) => {
    const stat = new statModel({
        lat: req.body.lat,
        lng: req.body.lng,
        accuracy: req.body.accuracy,
        acceleration: req.body.acceleration,
        wifi_strength: req.body.wifi_strength,
        isDriving: req.body.isDriving
    });

    stat
        .save()
        .then(() => {
            return res.send(stat);
        }, (e) => {
            res.status(400).send('{ "message": "Invalid request" }');
        });
});

router.post('/truncate', (req, res) => {
    const token = req.headers.token;
    const timestamp = req.headers.t;

    const resultToken = md5(`${api_key}${timestamp}`);

    if (token != resultToken) {
        return res.status(403).send('{ "message": "Access denied" }')
    }

    statModel.remove({}, (err) => {
        if (err) {
            return res.status(500).send('{ "message": "Something went wrong" }');
        } else {
            res.end();
        }
    });
});

module.exports = router;
