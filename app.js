const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const  userRouter = require('./routes/user');
const  homeRouter = require('./routes/home');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/', homeRouter);

const port = 5000;

app.listen(port, () => console.log( `Listening to port: ${port}`));