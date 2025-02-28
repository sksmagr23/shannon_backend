import express from 'express';
import { getCurrentWeather, getForecast, getHistory } from '../controller/weather.controller.js';

const router = express.Router();

router.get('/current/:city', getCurrentWeather);
router.get('/forecast/:city', getForecast);
router.get('/history/:city', getHistory);

export default router;