var expect = require("chai").expect;
var redis = require("redis");
var client = redis.createClient();

describe("Redis tests", function () {
    describe("Redis set tests", function () {

        it("attempt to store a set of categories to the datastore", function () {
            client.hmset('category', '1', 'category1', '2', 'category2', '3', 'category3', '4', 'category4', function (err, reply) {
                logResponse(err, reply);
            });
        });

        it("attempt to store a new category to existing category set", function () {
            client.hsetnx('category', '6', 'category6', function(err, reply) {
                logResponse(err, reply);
            });
        });

        it("attempt to delete a category from set", function() {
            client.hdel('category', '6', function(err, reply) {
                logResponse(err, reply);
            });
        });

        it("attempt to store a set of users to the datastore", function () {
            client.hmset('user', '1', 'user1', '2', 'user2', function (err, reply) {
                logResponse(err, reply);
            });
        });

        it("attempt to set categories for users", function () {
            client.sadd('category:1:users', '1', '2', function (err, reply) {
                logResponse(err, reply);
            });
            client.sadd('category:2:users', '1', function (err, reply) {
                logResponse(err, reply);
            });
            client.sadd('category:3:users', '1', function (err, reply) {
                logResponse(err, reply);
            });
        });

        it("attempt to get all users for a category", function() {
            client.smembers('category:1:users', function(err, reply) {
                logResponse(err, reply);
            });
        });

        it("attempt to retrieve a set of categories from the datastore", function () {
            client.hgetall('category', function (err, reply) {
                logResponse(err, reply);
            });

            client.hget('category', '2', function (err, reply) {
                logResponse(err, reply);
            });
        });

        it("attempt to store a hash of a movie", function () {
            client.hmset('movies:1', 'name', 'movie1', 'description', 'movie 1 description', 'dateAdded', Date.now(), 'isActive', '1', function (err, reply) {
                logResponse(err, reply);
            });

            client.hmset('movies:2', 'name', 'movie2', 'description', 'movie 2 description', 'dateAdded', Date.now(), 'isActive', '1', function (err, reply) {
                logResponse(err, reply);
            });

            client.hmset('movies:2', 'isActive', '0', 'dateUpdated', Date.now(), function(err, reply) {
                logResponse(err, reply);
            })
        });
    });

});

/// Simple method for console.log...
var logResponse = function (err, reply) {
    if (err)
        console.log('err = ' + err);

    if (reply) {
        try {
            console.log('reply = ' + JSON.stringify(reply));
        } catch (ex) {
            console.log('reply = ' + reply);
        }
    }
};
