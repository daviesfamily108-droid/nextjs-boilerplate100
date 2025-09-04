
"use client";
import { useEffect } from "react";
export default function OfflinePage(){
  useEffect(()=>{
    const n = parseInt(localStorage.getItem("use_offline")||"0")+1;
    localStorage.setItem("use_offline", String(n));
  },[]);
  return <div className="card max-w-4xl mx-auto">Offline Modes selector (170–501, legs/sets up to 9999) — stub screen.</div>;
}
