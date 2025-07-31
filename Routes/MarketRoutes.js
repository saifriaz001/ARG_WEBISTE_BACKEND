import express from 'express';
import {
  createMarket,
  getAllMarkets,
  deleteMarket
} from '../Controllers/MarketControllers.js';

import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/create-markets',verifyToken, createMarket);
router.get('/get-all-markets', getAllMarkets);
router.delete('/delete-market/:id', verifyToken, deleteMarket);


export default router;
