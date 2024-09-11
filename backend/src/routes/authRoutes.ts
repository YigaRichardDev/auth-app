import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/register', (req, res) => authController.register(req, res));

router.post('/login', (req, res) => authController.login(req, res));

export default router;