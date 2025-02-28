import express from 'express';
import dotenv from 'dotenv';
import DB_Connection from './config/dbConnection.js';

dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(cookieParser());

const connection_string = process.env.MONGO_URL;

DB_Connection(connection_string);
import userRouter from './router/user.route.js';
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

