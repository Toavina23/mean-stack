import cors from "cors";
import express, { Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import pino from "pino-http";
import mainRouter from "./routes/routes";
import mongoose from "mongoose";
import { otherError, validationError } from "./handlers/error.handler";
import path from "path";

// app bootstrap
const app = express();

// set up json logger
app.use(pino());

// set cors option for remote access
app.use(cors({ origin: ["*"] }));

// adding json body parser to app
app.use(bodyParser.json());

//mongoose connection
mongoose.connect(process.env.DB_URL);

app.use(express.static(path.join(__dirname, "public", "browser")));

// api main entry point
app.use("/api/*", mainRouter);

// serving app
app.get("*", function (req: Request, res: Response) {
	console.log("HELLO")
	res.sendFile(path.join(__dirname, "public", "browser", "index.html"));
});

// error handling middlewares
app.use(validationError);
app.use(otherError);

// use port from env or use 8000 if not set
const PORT = process.env.port ?? 8000;
app.listen(PORT, () => {
	console.log(`App up and running at http://localhost:${PORT}`);
});
