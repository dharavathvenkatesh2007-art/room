import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const doLogin = async () => {
    try {
      const res = await api.post("/auth-api/login", { username, password });
      setMsg("Login successful!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setTimeout(() => navigate("/choice"), 1000);
    } catch (err) {
      setMsg("Invalid credentials!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input value={username} onChange={e => setUser(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPass(e.target.value)} placeholder="Password" />
      <button onClick={doLogin}>Login</button>
      <div>{msg}</div>
      <div className="link" onClick={() => navigate("/register")}>New user? Register here</div>
    </div>
  );
}