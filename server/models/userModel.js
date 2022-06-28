import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    joined: String,
    role: String,
    token: String,
    address: String,
    projects: [String],
    nonce: Number,
});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;