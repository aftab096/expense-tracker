const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user");
const homeRouter = require("./routes/home");
const transactionRouter = require("./routes/transaction");
const {verifyToken} = require("./middlewares/middlewares");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/",verifyToken, homeRouter);
app.use("/transaction",verifyToken, transactionRouter);

const port = 5000;

app.listen(port, '0.0.0.0', () => console.log(`Listening to port: ${port}`));
