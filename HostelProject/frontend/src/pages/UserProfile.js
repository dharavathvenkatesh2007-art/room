import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  const updateUser = async () => {
    try {
      const res = await api.put(`/user-api/${user._id}`, user);
      setMsg("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      setMsg("Error updating profile");
    }
  };

  if (!user) return <p>No user logged in</p>;

  return (
    <div className="container">
      <h2>User Profile</h2>
      <input value={user.username} onChange={e => setUser({...user, username:e.target.value})} />
      <input value={user.role} onChange={e => setUser({...user, role:e.target.value})} />
      <button onClick={updateUser}>Update</button>
      <div>{msg}</div>
    </div>
  );
}