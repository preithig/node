
const express = require('express');
const path = require('path')

const router = express.Router();


router.get("/users", (req,res,next) => {

    console.log("Users router");
    res.status(200).sendFile(path.join(__dirname, '..', 'html', 'user.html'));

})

module.exports = router;