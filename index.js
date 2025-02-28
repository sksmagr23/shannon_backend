import express from 'express';
import dotenv from 'dotenv';
import DB_Connection from './config/dbConnection.js';
import userRouter from './router/user.route.js';
import weatherRouter from './router/weather.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const connection_string = process.env.MONGO_URL;

DB_Connection(connection_string);

app.use('/api/user', userRouter);
app.use('/api/weather', weatherRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

