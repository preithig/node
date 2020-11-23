const express = require("express")
const body = require("body-parser");

const app = express();

app.use(body.urlencoded( {extended: false}));

app.use("/add-product" , (req,res,next) => {
    console.log("In add-product");
    res.send('<form action="/products" method="POST">  <input type= "text" name="pdt"/><button type="Submit"> Add </button></form>')
})

app.post("/products", (req,res,next) => {

    console.log(req.body);
    res.redirect("/");

})

app.use("/", ( req,res,next) => {
    console.log("Response from Node.js");
    res.write("<h1> Response from Node </h1>")
})

app.listen(4000);