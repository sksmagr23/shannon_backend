import Router from 'express';
import { googleLogin, googleCallback } from '../controller/user.controller.js';

const router = Router();

router.get("/auth/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router;