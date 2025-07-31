import express from 'express';
import { createNews , getAllNews , deleteNewsById } from "../Controllers/NewsController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
const router = express.Router();

router.post('/createnews', verifyToken ,createNews);
router.get('/getnews', getAllNews);
router.delete('/delete-news/:id', verifyToken,deleteNewsById);

export default router;