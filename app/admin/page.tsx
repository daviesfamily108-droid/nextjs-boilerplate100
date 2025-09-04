
"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

const DEF = { online: 40, offline: 35, settings: 10, stats: 15 };

export default function AdminPage(){
  const [authed, setAuthed] = useState(false);
  const [first, setFirst] = useState(false);
  const [pwd, setPwd] = useState("");

  useEffect(()=>{
    const p = localStorage.getItem("admin_pwd");
    if (!p) { setFirst(true); }
  },[]);

  function login(){
    const stored = localStorage.getItem("admin_pwd");
    if (!stored) {
      localStorage.setItem("admin_pwd", pwd);
      setAuthed(true);
      setFirst(false);
      return;
    }
    if (pwd === stored) setAuthed(true);
    else alert("Incorrect password");
  }

  const data = useMemo(()=>{
    const raw = localStorage.getItem("usage_pie");
    const parsed = raw ? JSON.parse(raw) : DEF;
    return {
      labels: ["Online", "Offline", "Settings", "Stats"],
      datasets: [{ data: [parsed.online, parsed.offline, parsed.settings, parsed.stats] }]
    };
  }, [authed]);

  if (!authed) {
    return (
      <div className="max-w-md mx-auto card space-y-3">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p>Username: <b>admin</b></p>
        <input type="password" className="w-full px-3 py-2 rounded bg-slate-700"
          placeholder={first ? "Set new password" : "Enter password"}
          value={pwd} onChange={e=>setPwd(e.target.value)} />
        <button className="btn" onClick={login}>{first? "Set Password":"Login"}</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto card">
      <h1 className="text-2xl font-bold mb-4">Feature Popularity</h1>
      <Pie data={data} />
    </div>
  );
}
