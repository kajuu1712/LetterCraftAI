import express from "express";
import { getHistory, deleteLetter } from "../Controllers/history.js";
import { authMiddleware } from "../Middlewares/auth.js";

const historyRouter = express.Router();

// GET all letters
historyRouter.get("/letter", authMiddleware, getHistory);

// DELETE letter
historyRouter.delete("/letter/:id", authMiddleware, deleteLetter);

export default historyRouter;