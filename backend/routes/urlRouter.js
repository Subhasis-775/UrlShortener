import express from 'express';
import { getShortCode, shortenPost } from '../controllers/urlControllers.js';
const router=express.Router();
router.post('/shorten',shortenPost);
router.get('/:shortCode',getShortCode);
export default router;