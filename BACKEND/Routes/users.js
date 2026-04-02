import express from "express";
import { signup, login, logout } from "../Controllers/users.js";
import { authMiddleware } from "../Middlewares/auth.js";

const userRouter = express.Router();

// Signup
userRouter.post("/signup", signup);

// Login
userRouter.post("/login", login);

// Logout
userRouter.post("/logout", authMiddleware, logout);

export default userRouter;