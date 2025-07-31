import express from 'express';
import {
  createService,
  getAllServices,
  deleteService
} from '../controllers/ServiceControllers.js'

import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/create-services',verifyToken, createService);
router.get('/get-all-services', getAllServices);
router.delete('/delete-services/:id', verifyToken, deleteService);


export default router;
