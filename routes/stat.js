var express = require('express');
var router = express.Router();
var statModel = require("../models/stat");
var md5 = require('md5');

const api_key = 'Qayl ara merjir serjin';


/* GET users listing. */
router.get('/', (req, res) => {
    statModel
        .find({})
        .then((stats) => {
            return res.send(stats);
        });
});

router.post('/', (req, res) => {
    const stats = req.body.data;
    if (!stats) {
        res.status(400).send('{ "message": "Invalid request" }');
    }
    const promises = [];

    stats.forEach(stat => {
        const mongoStat = new statModel({
            lat: stat.lat,
            lng: stat.lng,
            accuracy: stat.accuracy,
            accelerationX: stat.accelerationX,
            accelerationY: stat.accelerationY,
            accelerationZ: stat.accelerationZ,
            wifi_strength: stat.wifi_strength,
            isDriving: stat.isDriving
        });
        promises.push(mongoStat.save());
    });

    Promise
        .all(promises)
        .then(() => {
            return res.status(201).end();
        }, (e) => {
            res.status(400).send(e);
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
