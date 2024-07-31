
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:String,
    username: String,
    password:String,
    coverImage: String,
    ptofileImage:String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User