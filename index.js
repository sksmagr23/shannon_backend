import express from 'express';
import dotenv from 'dotenv';
import DB_Connection from './config/dbConnection.js';
import weatherRouter from './router/weather.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import locationRouter from './router/location.route.js';
import dashboardRouter from './router/dashboard.route.js';
import predictionRouter from './router/prediction.router.js';
dotenv.config();
const app = express();

app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json());

const connection_string = process.env.MONGO_URL;

DB_Connection(connection_string);

app.use('/api/weather', weatherRouter);
app.use('/api/location', locationRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/prediction', predictionRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

