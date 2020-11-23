const express = require("express")

const app = express();

app.use( "/users", (req,res,next) => {
    console.log("First middleware");
    res.write("<h1> Middleware with users context </h1>")
    
})

app.use("/", ( req,res,next) => {
    console.log("Second middleware");
    res.write("<h1> Response from second </h1>")
})

app.listen(4000);