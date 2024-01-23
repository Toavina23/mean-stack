import express, { Request, Response } from "express";
import { register } from "../handlers/auth.handler";
const authRouter = express.Router();
authRouter.post("/register", register);
export default authRouter;
