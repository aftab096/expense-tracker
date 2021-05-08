const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const tableNameCosntants = require("../tack/table-name-constants").tables;

const connection = require("../connection");

router.get("/transactions", (req, res) => {

  const query = `SELECT * FROM ${tableNameCosntants.TRANSACTIONS} ORDER BY datetime DESC LIMIT 5`;

  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err.stack);
    else {
      res.json({success: result});
    }
  });

  // res.json({ success: mockResponse });
});

router.get("/topcategories", (req, res) => {
  let mockResponse = [
    {
      id: "food",
      label: "Food",
      totalExpense: 15000,
    },
    {
      id: "bill",
      label: "Bills & payments",
      totalExpense: 8000,
    },
    {
      id: "shopping",
      label: "Shopping",
      totalExpense: 7000,
    },
  ];
  res.json({ success: mockResponse });
});

module.exports = router;
