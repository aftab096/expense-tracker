const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connection = require("../connection");
const tableNameCosntants = require("../tack/table-name-constants").tables;

router.post("/signup", async (req, res) => {
  const { username, name, password, email } = req.body;
  try {
    let user = await getUser(username, username);
    
    if (user.length === 0) {
      const query = `INSERT INTO ${tableNameCosntants.USERS}
            (user_id, name, password, email) VALUES (
            '${username}', 
            '${name}', 
            '${password}', 
            '${email}')`;

      connection.query(query, (err, result) => {
        if (err) throw err;
        res.json({ success: username });
      });
    } else res.json({ error: username });
  } catch (err) {
    res.json({ error: err.stack });
  }
});

let getUser = (username, email) => {
  const query = `SELECT * FROM ${tableNameCosntants.USERS} WHERE user_id = '${username}' OR email = '${email}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
        resolve(result);
    });
  });
};

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await getUser(username, username);
    if (user.length > 0) {
      const query = `SELECT * FROM ${tableNameCosntants.USERS}
            WHERE (user_id = '${username}' OR email = '${username}')
            AND password = '${password}';`;

      connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const user = { username: result[0].user_id, email: result[0].email };

          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          res.json({ success: username, accessToken: accessToken });
        } else {
          res.status(500).json({ message: "incorrect password" });
        }
      });
    } else res.status(500).json({ message: `user not found => ${username}` });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
});

module.exports = router;
