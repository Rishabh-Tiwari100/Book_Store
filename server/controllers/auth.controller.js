import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import fs from "fs";
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if(name.length < 4) {
            return res.status(400).json({ error: "Name must be at least 4 characters long" });
        }
        if(password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!validEmailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            req.body.avatar = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword, avatar: req.body.avatar });
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id, user.role);
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 30 *24 * 60 * 60 * 1000 });
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ user: userWithoutPassword, accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in register controller:", error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id, user.role);
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 30 * 24 * 60 * 60 * 1000 });
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ user: userWithoutPassword, accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in login controller:", error);
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const refresh = async(req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded =  verifyRefreshToken(refreshToken);
        const accessToken = generateAccessToken(decoded.id, decoded.role);
        const user = await User.findById(decoded.id).select("-password");
        res.status(200).json({ accessToken, user });
    } catch (error) {
        console.log("Error in refresh controller:");
        res.status(500).json({ error: error.message });
    }
}
const profile = () => {
}

export { register, login, logout, refresh, profile };