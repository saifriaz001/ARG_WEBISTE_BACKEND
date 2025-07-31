import express from 'express';
import {
  createProject,
  getAllProjects,
  deleteProject
} from '../controllers/ProjectControllers.js';

import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/create-project', verifyToken, createProject);
router.get('/get-all-projects', getAllProjects);
router.delete('/delete-projects/:id',verifyToken, deleteProject);
export default router;
