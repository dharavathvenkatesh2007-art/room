import exp from "express";
import Booking from "../models/Booking.js";

export const bookingApp = exp.Router();

// Create booking
bookingApp.post("/", async (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) { next(err); }
});

// Get bookings
bookingApp.get("/", async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("user hostel");
    res.json(bookings);
  } catch (err) { next(err); }
});