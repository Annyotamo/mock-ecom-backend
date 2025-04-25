import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 6,
            select: false,
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default model("User", userSchema);
