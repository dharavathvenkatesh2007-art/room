import exp from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authApp = exp.Router();

// Register new user
authApp.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "Registration successful", user });
  } catch (err) { next(err); }
});

// Login existing user
authApp.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
    res.json({ message: "Login successful", user });
  } catch (err) { next(err); }
});