import express from 'express';
import dotenv from 'dotenv';
import DB_Connection from './config/dbConnection.js';
import userRouter from './router/user.route.js';
import weatherRouter from './router/weather.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import locationRouter from './router/location.route.js';
import passport from 'passport';
import session from 'express-session';
import './config/passportConfig.js';
import dashboardRouter from './router/dashboard.route.js';

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

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', userRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/location', locationRouter);
app.use('/api/dashboard', dashboardRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

