import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType, HotelType } from "../shared/types";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

// userSchema.pre("save", async function (next) {
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password);
//     }
//     next();
// });

userSchema.pre("save", async function (next) {
    const user = this as mongoose.Document & { password: string };
    if (user.isModified('password')) {
        // Passing 10 as the salt rounds
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;