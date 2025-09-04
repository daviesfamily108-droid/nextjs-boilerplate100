
"use client";
export default function OnlinePage(){
  if (typeof window !== "undefined") {
    const n = parseInt(localStorage.getItem("use_online")||"0")+1;
    localStorage.setItem("use_online", String(n));
  }
  return <div className="card max-w-4xl mx-auto">Online Mode (friends, matchmaking, spectate) — stub screen.</div>;
}
