require('dotenv').config(); // load file .env
const connectDB = require('./Config/db');
const cors = require('cors');
const express = require('express');
const workRouter = require('./Routers/workRouter');

const app = express();
app.use(express.json()); // hieu duoc request
app.use(cors()); // dùng khi frontend và backend tách biệt: khác cổng,....

connectDB();
app.use('/api', workRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Connect with port:", port);
})


