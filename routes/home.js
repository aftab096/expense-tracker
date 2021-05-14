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

router.post("/graph", async (req, res) => {
  const duration = req.body.duration;
  const endOfDay = new Date();
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setHours(0, 0, 0, 0);
  const endofDayTimestamp = endOfDay.valueOf();
  let startDayTimestamp = new Date(endOfDay)
    .setDate(endOfDay.getDate() - duration)
    .valueOf();

  const offset = getOffsetValueFromDuration(duration);
  const day = 86400000;

  // const totalExpenseQuery = `SELECT SUM(amount) AS amount from ${tableNameCosntants.TRANSACTIONS} WHERE type = 'debit' AND
  //   datetime BETWEEN ${startDayTimestamp} AND ${endofDayTimestamp}`

  let data = [];
  let totalExpense = 0;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  for (let i = startDayTimestamp; i < endofDayTimestamp; ) {
    const from = i;
    const to = startDayTimestamp + day * offset;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const range = `${fromDate.getDate()} ${
      months[fromDate.getMonth() - 1]
    } - ${toDate.getDate()} ${months[toDate.getMonth() - 1]}`;

    const query = `SELECT SUM(amount) AS amount from ${tableNameCosntants.TRANSACTIONS} WHERE type = 'debit' AND
    datetime BETWEEN ${from} AND ${to}`;

    try {
      const amount = await fetchDataForGraph(query);
      data.push({
        x: range,
        y: amount,
      });
      totalExpense += amount;
    } catch (err) {
      res.status(500).json(err.stack);
    }

    startDayTimestamp = startDayTimestamp + day * offset;
    i = startDayTimestamp;
  }
  res.json({ success: data, totalExpense: totalExpense });
});

const fetchDataForGraph = async (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result[0]?.amount || 0);
    });
  });
};

const getOffsetValueFromDuration = (duration) => {
  switch (duration) {
    case 7:
      return 1;

    case 30:
      return 5;

    case 90:
      return 15;
  }
};

module.exports = router;
