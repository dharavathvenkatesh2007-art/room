import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Provider() {
  const [form, setForm] = useState({ location:"", type:"Hostel", price:"", contact:"", rooms:"", vacancy:"", photo:"" });
  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);

  const saveData = async () => {
    try {
      await api.post("/hostel-api", form);
      setMsg("Accommodation saved!");
      loadProviderList();
    } catch (err) {
      setMsg("Error saving accommodation");
    }
  };

  const loadProviderList = async () => {
    const res = await api.get("/hostel-api");
    setList(res.data);
  };

  useEffect(() => { loadProviderList(); }, []);

  return (
    <div className="container">
      <h2>Provider Portal</h2>
      <input value={form.location} onChange={e => setForm({...form, location:e.target.value})} placeholder="Location" />
      <select value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
        <option>Hostel</option><option>PG</option><option>Room</option><option>Hotel</option>
      </select>
      <input value={form.price} onChange={e => setForm({...form, price:e.target.value})} placeholder="Price" />
      <input value={form.contact} onChange={e => setForm({...form, contact:e.target.value})} placeholder="Contact" />
      <input value={form.rooms} onChange={e => setForm({...form, rooms:e.target.value})} placeholder="Rooms" />
      <input value={form.vacancy} onChange={e => setForm({...form, vacancy:e.target.value})} placeholder="Vacancy" />
      <input value={form.photo} onChange={e => setForm({...form, photo:e.target.value})} placeholder="Photo URL" />
      <button onClick={saveData}>Submit</button>
      <div>{msg}</div>
      <h3>My Accommodations</h3>
      {list.map((p,i) => (
        <div key={i} className="card">
          <h3>{p.type} in {p.location}</h3>
          <p>Price: {p.price}</p>
          <p>Contact: {p.contact}</p>
          <p>Rooms: {p.rooms}</p>
          <p>Vacancy: {p.vacancy}</p>
          <img src={p.photo} alt="Photo"/>
        </div>
      ))}
    </div>
  );
}