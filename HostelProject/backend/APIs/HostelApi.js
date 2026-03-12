import exp from "express";
import Hostel from "../models/Hostel.js";

export const hostelApp = exp.Router();

hostelApp.get("/", async (req, res, next) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) { next(err); }
});

hostelApp.post("/", async (req, res, next) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.status(201).json(hostel);
  } catch (err) { next(err); }
});