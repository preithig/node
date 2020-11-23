const express = require('express');

const path = require('path');

const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-product" , (req,res,next) => {
    console.log("In add-product");

    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  //  res.send('<form action="/admin/products" method="POST">  <input type= "text" name="pdt"/><button type="Submit"> Add </button></form>')
})

router.post("/products", (req,res,next) => {

    console.log(req.body);


    res.redirect("/");

})


module.exports = router;