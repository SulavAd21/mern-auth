import { authUser } from "../controllers/userControllers.js";
import express from "express";

const router = express.Router();

router.post('/auth', authUser)

export default router;