const { Router } = require('express');
const express = require('express');
const router = express.Router();

const connection = require('../connection');
const tableNameConstants = require('./../tack/table-name-constants').tables;

const _ = require('lodash');
const { v4: uuidv4, validate } = require('uuid');

router.get('/', (req, res) => {
    res.send("Router is cool");
});

const validateProductId = (product_id) => {
    const query = `Select * from ${tableNameConstants.PRODUCTS} where product_id = '${product_id}'`;
    connection.query(query, (err, result) => {
        if(err) throw err;
        if(_.isEmpty(result)) return false;
        return true;
    });
}

router.put('/', (req,res) => {

    const requestData = req.body;

    const {product_id} = requestData;

    if(!validateProductId(product_id)) throw "Invalid product_id";

    let expenseModel = {
        ex_id: uuidv4(),
        expense_time: +new Date,
    }

    _.assign(expenseModel,requestData);
    
    res.send(JSON.stringify(expenseModel));
});

module.exports = router;