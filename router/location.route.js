import { Router } from 'express';
import { addLocation, getLocations } from '../controller/location.controller.js';
const router = Router();

router.post('/add', addLocation);
router.get('/get', getLocations);
export default router;