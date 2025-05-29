import { authMiddleware } from "../middleware/auth.middleware.js";
import express from "express";
import { register,login,logout,check,forgetPassword } from "../controllers/auth.controller.js";    
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout",authMiddleware,logout);
authRoutes.get("/check", authMiddleware,check);
authRoutes.post("/forgot-password",authMiddleware,forgetPassword);

export default authRoutes