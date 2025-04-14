require('dotenv').config(); // load file .env
const connectDB = require('./Config/db');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser'); // đọc dữ liệu cookie
const workRouter = require('./Routers/workRouter');
const userRouter = require('./Routers/userRouter');

const app = express();
app.use(express.json()); // hieu duoc request
app.use(cors({ origin: 'http://localhost:5173', credentials: true})); // dùng khi frontend và backend tách biệt: khác cổng,....
// credentials: true cho phép gửi cookie từ frontend
app.use(cookieParser()); // cho phép đọc cookies từ request client

connectDB();
app.use('/api/work', workRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Connect with port:", port);
})


