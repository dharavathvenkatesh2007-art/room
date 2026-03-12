import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);