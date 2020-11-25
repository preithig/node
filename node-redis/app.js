const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch')

const app = express();

app.listen(3000, () => {
    console.log("Server up");
})

const redisClient = redis.createClient({
    port: 13884,
    host: '<host>',
    password: '<password>'

});

redisClient.on('connect', function () {
    console.log('Connected to Redis')
});

redisClient.on("error", function (err) {
    console.log("Error " + err);
});


app.get("/repos/:username", cache, getPublicReposNumber);

function cache(req, res, next) {
    console.log("in cache")
    const { username } = req.params;

    redisClient.get(username, (err, data) => {
        if (err) throw err;
        if (data != null) {
            console.log("data is not null. returning from cache")
            res.send({ username: data });
        } else {
            next();
        }
    })
}

async function getPublicReposNumber(req, res, next) {

    try {

        console.log("Fetch from GIT");

        const { username } = req.params;

        console.log(username);

        const response = await fetch('https://api.github.com/users/' + username);
        const data = await response.json();

        //redisClient.setex(username, 3600, data.toString());
        redisClient.set(username, username);
        res.status(200).send({ username: username, data: data });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
}