import express from "express";
import { generateLetter } from "../Controllers/letter.js";
import { authMiddleware } from "../Middlewares/auth.js";

const letterRouter = express.Router();

letterRouter.post("/generate", authMiddleware, generateLetter);

export default letterRouter;