const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "expensetracker",
    multipleStatements: true,
    insecureAuth: true
});

connection.connect((err)=>{
    if(err){
        console.log("Connected failed",err);
    } 
    console.log("Database Connected");
})

module.exports = connection;