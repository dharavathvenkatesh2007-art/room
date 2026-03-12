import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cors from "cors";


// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Choice from "./pages/Choice";
import Provider from "./pages/Provider";
import User from "./pages/User";
import UserProfile from "./pages/UserProfile";
App.use(cors({
  origin: "https://hostel-frontend.netlify.app", // your Netlify frontend URL
  credentials: true
}));

// Import global styles
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/choice" element={<Choice />} />

        {/* User & Provider routes */}
        <Route path="/provider" element={<Provider />} />
        <Route path="/user" element={<User />} />

        {/* User profile update route */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;