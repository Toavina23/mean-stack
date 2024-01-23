import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { User } from "../models/user";

const registrationInfoSchema = z.object({
	username: z.string().min(1),
	password: z.string().min(8),
	fullname: z.string().min(1),
});
export async function register(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const newUserInfo = registrationInfoSchema.parse(req.body);
		const newUser = new User(newUserInfo);
		await newUser.save();
		req.log.info("User registered");
		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
}
