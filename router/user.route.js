import Router from 'express';
import { GoogleLogin } from '../controller/user.controller.js';

const router = Router();

router.get('/google', GoogleLogin);

export default router;