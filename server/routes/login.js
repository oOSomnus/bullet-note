//login.js
const express = require('express');
const passport = require('../passport-config'); // Update the path accordingly
const router = express.Router();

router.post('/', passport.authenticate('local'), (req,res)=>{
    console.log(req.user);
    res.send(req.user);
})



  

module.exports = router;
