const express =require('express');

const routes = express.Router();

routes.get("/users", (req, res, next ) => {

    console.log("in users");

})

module.exports = routes;