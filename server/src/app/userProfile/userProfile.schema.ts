import * as mongoose from "mongoose";

export const UserProfileModuleSchema = new mongoose.Schema({
    name: String,
    profilePic: String,
    address: String,
    age: Number,
}, {timestamps: true});
