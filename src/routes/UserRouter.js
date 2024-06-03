import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.post('/get-me', UserController.getMe);
router.get('/get-all', UserController.getAll);

export default router;
