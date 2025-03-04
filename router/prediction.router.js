import { fetchPrediction } from "../controller/prediction.controller.js";
import express from "express";
const router = express.Router();
router.post("/predict", fetchPrediction);
export default router;