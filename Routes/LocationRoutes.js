import express from 'express';
import {
  createLocation,
  getAllLocations
} from '../controllers/locationControllers.js';

import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/create-location',verifyToken, createLocation);
router.get('/get-location', getAllLocations);

export default router;
