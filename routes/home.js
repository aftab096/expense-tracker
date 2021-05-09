const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const tableNameCosntants = require("../tack/table-name-constants").tables;

const connection = require("../connection");

router.get("/transactions", (req, res) => {
  const userId = req.header("userId");
  const query = `SELECT * FROM ${tableNameCosntants.TRANSACTIONS} where user_id = '${userId}' ORDER BY datetime DESC LIMIT 5`;

  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err.stack);
    else {
      res.json({ success: result });
    }
  });
});

router.get("/topcategories", (req, res) => {
  const userId = req.header("userId");
  const currentDatetime = new Date().valueOf();
  const timeStampOf30daysAgo = currentDatetime - 86400000 * 30;

  const query = `SELECT category,sum(amount) AS totalExpense FROM ${tableNameCosntants.TRANSACTIONS}
                  WHERE user_id = '${userId}' AND 
                  type='debit' AND 
                  datetime >= ${timeStampOf30daysAgo} 
                  GROUP BY category 
                  ORDER BY totalExpense DESC
                  LIMIT 3`;

  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err.stack);
    else {
      res.json({ success: result });
    }
  });
});

module.exports = router;
