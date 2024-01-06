//login.js
const express = require('express');
const passport = require('../passport-config'); // Update the path accordingly
const router = express.Router();

router.get('/logout', (req, res,next) => {
    req.logOut((err)=>{
        if(err){return next(err);}
        res.json({success:true});
    })
  });

module.exports = router;
