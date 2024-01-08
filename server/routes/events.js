//events.js
var express = require('express');
const pool = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/:type', async function(req, res, next) {
  const {type} = req.params;
  console.log("req: ",req.user);
  try{
    const result = await pool.query(
        `SELECT FROM ${type} WHERE user_id = $1`,[req.user.id]
    );
    res.json(result.rows);
    }
    catch(err){
        console.error("Error: ", err);
    }
  }
);

module.exports = router;
