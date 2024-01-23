import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function validationError(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ZodError) {
		req.log.error(err);
		err.name = "Bad request";
		res.status(400).json({
			error: "Bad request",
			messages: err.issues,
		});
	} else {
		next(err);
	}
}

export function otherError(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	req.log.error(err);
	res.status(500).json({
		"Error Message": "Internal server error",
	});
}
