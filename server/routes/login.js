//login.js
const express = require('express');
const passport = require('passport'); // Update the path accordingly
const router = express.Router();

router.post('/', passport.authenticate('local'),(req, res, next)=>{
    res.send(req.user);
})

  router.get('/check', (req,res,next)=>{
    console.log("checking login status");
    if(req.isAuthenticated()){
         res.json({authenticated : true});
    }else{
        res.json({authenticated: false});
    }
    next();
  })
  

module.exports = router;
