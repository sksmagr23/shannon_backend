import { fetchPrediction } from "../controller/prediction.controller.js";
import express from "express";
const router = express.Router();
router.get("/preFetch", fetchPrediction);
export default router;