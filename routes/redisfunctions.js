/**
 * Created by U8X4963 on 1/21/2016.
 */
var express = require('express');
var router = express.Router();
var redis = require("redis");
var client = redis.createClient();

// get all spaces
router.get('/spaces', function (req, res, next) {
    client.hgetall('spaces', function (err, reply) {
        if (err)
            res.json(err);
        else
            res.json(reply);
    });
});

// get a specific space
router.get('/spaces/:id', function (req, res, next) {
    client.hget('spaces', req.params['id'], function (err, reply) {
        if (err)
            res.json(err);
        else
            res.json(reply);
    });
});

// get all entries for a space
router.get('/spaces/:spaceId/entries', function (req, res, next) {
    var param = 'spaces:' + req.params['spaceId'] + ':entries';

    client.hgetall(param, function (err, reply) {
        if (err)
            res.json(err);
        else
            res.json(reply);
    });
});

// get a specific entry for a space
router.get('/spaces/:spaceId/entries/:entryId', function (req, res, next) {
    var param = 'spaces:' + req.params['spaceId'] + ':entries:' + req.params['entryId'];

    client.hgetall(param, function (err, reply) {
        if (err)
            res.json(err);
        else
            res.json(reply);
    });
});

module.exports = router;