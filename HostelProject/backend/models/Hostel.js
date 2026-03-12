import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
  location: String,
  type: { type: String, enum: ["Hostel", "PG", "Room", "Hotel"] },
  price: String,
  contact: String,
  rooms: Number,
  vacancy: Number,
  photo: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Hostel", hostelSchema);