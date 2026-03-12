import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const doRegister = async () => {
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }
    try {
      await api.post("/auth-api/register", { username, password });
      setMsg("Registration successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg("Error registering user");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input value={username} onChange={e => setUser(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPass(e.target.value)} placeholder="Password" />
      <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm Password" />
      <button onClick={doRegister}>Register</button>
      <div>{msg}</div>
      <div className="link" onClick={() => navigate("/")}>Already registered? Login here</div>
    </div>
  );
}