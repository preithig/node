
//const http = require('http');

const express = require('express');

const app = express();

app.use("/add-product", (req,res,next) => {

    console.log("In the middleware");
    res.write("<h1> Add product page</h1>")
})
 

app.use("/", (req,res,next) => {

    console.log("In the middleware");
    res.write("<h1> Hello Node.js</h1>")
})
 
const routes = require('./routes');

//const server = http.createServer( app);

//server.listen(3000);

app.listen(3000);