import exp from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import { authApp } from "../backend/APIs/AuthApi.js";
import { userApp } from "../backend/APIs/UserApi";
import { hostelApp } from "../backend/APIs/HostelApi.js";
import { bookingApp } from "../backend/APIs/BookingApi.js";

dotenv.config();
const app = exp();
const port = process.env.PORT || 4000;

// Add CORS here
app.use(cors({
  origin: "https://hostel-backend.onrender.com", // replace with your actual frontend URL
  credentials: true
}));

app.use(exp.json());
app.use(cookieParser());

// APIs
app.use("/auth-api", authApp);
app.use("/user-api", userApp);
app.use("/hostel-api", hostelApp);
app.use("/booking-api", bookingApp);

// Connect DB
async function connectDB() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("DB Connected Successfully");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.log("Error in DB connection:", err);
  }
}
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation Error", error: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Cast Error", error: err.message });
  }
  res.status(500).json({ message: "Server Error", error: err.message });
});