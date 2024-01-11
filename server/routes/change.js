var express = require('express');
const pool = require('../db');
var router = express.Router();

/* GET home page. */
router.put('/:type/:id', async function(req, res, next) {
  const {type, id} = req.params;
  const event = req.body.event;
  try{
    const result = await pool.query(
        `UPDATE ${type} SET content = $1 WHERE note_id = $2`,
        [event, id]
    );
    if (result.rowCount === 1) {
        console.log('Record updated successfully');
      } else {
        console.log('Record not found');
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  }
);

router.delete('/:type/:id', async function(req, res, next) {
    const {type, id} = req.params;
    try{
      const result = await pool.query(
          `DELETE FROM ${type} WHERE note_id = $1`,
          [id]
      );
      if (result.rowCount === 1) {
          console.log('Record deleted successfully');
        } else {
          console.log('Record not found');
        }
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  );

module.exports = router;
