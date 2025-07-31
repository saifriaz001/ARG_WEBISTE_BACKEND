import express from "express";
import {
  createJob,
  getAllJobs,
  deleteJob,
} from "../Controllers/jobControllers.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

// Create a new router instance from Express
const router = express.Router();

router.post("/create-job", verifyToken, createJob);

router.get("/get-jobs", getAllJobs);

router.delete("/delete-job/:id", verifyToken, deleteJob);

export default router;
