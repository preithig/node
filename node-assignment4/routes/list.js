const express =require('express');

const routes = express.Router();

routes.get("/", (req, res, next ) => {

    console.log("in get");

})

module.exports = routes;