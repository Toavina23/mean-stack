import { Schema, model } from "mongoose";

interface IUser {
	username: String;
	password: String;
	fullname: String;
}
const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	password: { type: String, required: true },
	fullname: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);
