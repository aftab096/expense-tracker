const express = require("express");
const router = express.Router();
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const connection = require("../connection");
const tableNameCosntants = require("../tack/table-name-constants").tables;

router.post("/", (req, res) => {
  const t_id = uuidv4();
  const { desc, amount, datetime, category, type, userId } = req.body;

  const query = `INSERT INTO ${tableNameCosntants.TRANSACTIONS}
            (t_id, description, amount, datetime, category, type, user_id) VALUES (
            '${t_id}','${desc}',${amount},${datetime},'${category}','${type}','${userId}')`;

  connection.query(query, (err, result) => {
    if (err) res.status(500).json({ error: err.stack });
    else res.json({ success: "Transaction Saved Successfully" });
  });
});

router.put("/", (req, res) => {
  const { t_id, desc, amount, datetime, category, type, userId } = req.body;

  const query = `UPDATE ${tableNameCosntants.TRANSACTIONS}
            SET description = '${desc}', 
            amount = ${amount}, 
            datetime = ${datetime}, 
            category = '${category}', 
            type ='${type}'
            WHERE user_id = '${userId}' AND t_id = '${t_id}'`;

  connection.query(query, (err, result) => {
    if (err) res.status(500).json({ error: err.stack });
    else res.json({ success: "Transaction Saved Successfully" });
  });
});

router.delete("/:id", (req,res) => {
  const t_id = req.params.id;
  const query = `DELETE FROM ${tableNameCosntants.TRANSACTIONS} WHERE t_id = '${t_id}'`;
  connection.query(query, (err, result) => {
    if(err) res.status(500).json({ error : err.stack});
    else res.json({success: t_id});
  })
});

module.exports = router;
