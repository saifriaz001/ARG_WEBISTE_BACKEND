import express from 'express';
import {
  createOrUpdateProjectArray,
  getProjectArray,
  deleteProjectArrayById
} from '../Controllers/projectArrayController.js';
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
const router = express.Router();

router.post('/create-projectArray',verifyToken, createOrUpdateProjectArray); // Upsert
router.get('/get-projectArray', getProjectArray);             // Get first/only
router.delete('/delete-projectArray/:id',verifyToken, deleteProjectArrayById); // Delete by ID

export default router;
