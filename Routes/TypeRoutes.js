import express from 'express';
import { createType , getAllTypes , deleteType } from "../Controllers/TypeControllers.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/create-type', verifyToken ,createType);
router.get('/get-all-types', getAllTypes);  
router.delete('/delete-type/:id',verifyToken, deleteType);  

export default router;