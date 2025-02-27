import express from 'express';
import { addToBasket, removeFromBasket, getBasket } from '../controllers/basketController.js';
import authMiddleware from '../middleware/auth.js';

const basketRouter = express.Router();

basketRouter.post('/add', authMiddleware, addToBasket);
basketRouter.post('/remove', authMiddleware, removeFromBasket);
basketRouter.get('/list', authMiddleware, getBasket);

export default basketRouter;