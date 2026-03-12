import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function User() {
  const [results, setResults] = useState([]);

  const loadUserList = async () => {
    const res = await api.get("/hostel-api");
    setResults(res.data);
  };

  useEffect(() => { loadUserList(); }, []);

  return (
    <div className="container">
      <h2>Available Accommodations</h2>
      {results.length === 0 ? <p>No accommodations available.</p> :
        results.map((p,i) => (
          <div key={i} className="card">
            <h3>{p.type} in {p.location}</h3>
            <p>Price: {p.price}</p>
            <p>Contact: {p.contact}</p>
            <p>Rooms: {p.rooms}</p>
            <p>Vacancy: {p.vacancy}</p>
            <img src={p.photo} alt="Photo"/>
          </div>
        ))
      }
    </div>
  );
}