const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connection = require("../connection");

router.get("/transactions", (req, res) => {
  let mockResponse = [
    {
      id: 1,
      description: "Mobile Recharge Self",
      date: "27-04-2021 Tuesday",
      amount: 199,
      type: "debit",
      category: "bill",
    },
    {
      id: 2,
      description: "D-Mart",
      date: "26-04-2021 Monday",
      amount: 6000,
      type: "debit",
      category: "shopping",
    },
    {
      id: 3,
      description: "Salary",
      date: "25-04-2021 Sunday",
      amount: 50000,
      type: "credit",
      category: "salary",
    },
    {
      id: 4,
      description: "Cab",
      date: "25-04-2021 Sunday",
      amount: 400,
      type: "debit",
      category: "travel",
    },
    {
      id: 5,
      description: "Maaz restaurant",
      date: "20-04-2021 Tuesday",
      amount: 800,
      type: "debit",
      category: "food",
    },
  ];
  res.json({ success: mockResponse });
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
