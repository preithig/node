const express = require('express')

const app = express();


const userRouter = require('./js/user');
const listRouter = require('./js/list');

app.use(express.static('./public'));

app.use(userRouter);
app.use(listRouter);

app.listen(5000);