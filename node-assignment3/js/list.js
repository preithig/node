
const express = require('express');
const path = require ('path');

const router = express.Router();


router.get("/", (req,res,next) => {

    console.log("List router");
    res.status(200).sendFile(path.join(__dirname, '..', 'html', 'list.html'));
})

module.exports = router;