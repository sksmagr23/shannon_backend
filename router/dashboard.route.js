import { addDashboard, getDashboard } from "../controller/dashboard.controller.js";
import { Router } from "express";

const router = Router();

router.post("/add", addDashboard);
router.get("/getdashboard", getDashboard);

export default router;