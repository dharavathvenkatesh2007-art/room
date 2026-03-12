import React from "react";
import { useNavigate } from "react-router-dom";

export default function Choice() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>Welcome to Hostel Finder</h2>
      <button className="choice-btn" onClick={() => navigate("/user")}>User</button>
      <button className="choice-btn" onClick={() => navigate("/provider")}>Provider</button>
      <div className="link" onClick={() => navigate("/")}>Logout</div>
    </div>
  );
}