import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const SALT_ROUNDS = 10;

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.validated.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Admin registered successfully",
            admin: { id: admin._id, name: admin.name, email: admin.email },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.validated.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};