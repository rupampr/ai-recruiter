import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    role: {
        type: String,
        enum: ["admin", "recruiter", "candidate"],
        default: "candidate"
    }
}, { timestamps: true });


userSchema.pre('save', async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


// userSchema.methods.generateJWT = function () {
//     return jwt.sign(
//         { id: this._id, role: this.role },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN }
//     );
// };


export const User = mongoose.model("User", userSchema);
